import pandas as pd 
from sklearn.model_selection import train_test_split
import numpy as np
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import confusion_matrix
import random
import numpy as np 
from collections import Counter
import string
from joblib import dump, load
import os


def euclidean_distance(user_1, user_2):
    return np.sqrt(np.sum((user_1 - user_2) ** 2))

class knn:

    def __init__(self, k):
        self.k = k


    def fit(self, X, y):
        self.X_train = X
        self.y_train = y


    def predict(self, X):
        predictions = [self._predict(x) for x in X]
        return np.array(predictions)


    def _predict(self, x):
        # Compute distances between current user and all other users
        distances = [euclidean_distance(x, x_train) for x_train in self.X_train]

        # Find smallest k distances to find k nearest neighbours
        k_indices = np.argsort(distances)[:self.k]

        # Find out favourite genre of each neighbour
        neighbour_genres = [self.y_train[i] for i in k_indices]

        # Among the k nearst neighbours, find out the most common genre
        most_common_genre = Counter(neighbour_genres).most_common(1)

        return most_common_genre[0][0]


def apply_knn_user_based_common_movies(k, test_size, ratings):
    # Create a new directory to store the models if the folder does not exist yet
    model_path = os.path.join('algorithms', 'models', 'user_based_common_movies')
    if not os.path.exists(model_path):
        os.makedirs(model_path, mode=0o777)
    
    # Test dataset size given as a percentage, convert it to decimal
    converted_test_size = test_size / 100

    # Read in the dataset
    dataset = pd.read_csv('dataset/preliminary_dataset.csv')
    # Split dataset into training set and testing set
    X = dataset.drop(columns=['userId', 'favourite_genre']).values
    y = dataset['favourite_genre'].values
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=converted_test_size, random_state=1234)

    # Generate ID for new model created
    # ID will be stored in the format - k{k}test{test_size} in string format
    model_id = f'k{k}test{test_size}'
    filename = os.path.join(model_path, f'model_{model_id}.sav')
    if os.path.exists(filename):
        model = load(filename)
        predictions = model.predict(X_test)
        accuracy = np.sum(predictions == y_test) / len(y_test)
        genre = predict_first_random_user(model, ratings)
        return {'accuracy': accuracy, 'genre': genre}

    model = knn(k)
    model.fit(X_train, y_train)
    dump(model, filename)
    predictions = model.predict(X_test)
    accuracy = np.sum(predictions == y_test) / len(y_test)
    genre = predict_first_random_user(model, ratings)
    return {'accuracy': accuracy, 'genre': genre}


# Take in a list of random ratings (0 - 5 inclusive) to create a sample user
# Use model to predict sample user's favourite genre
def predict_first_random_user(model, ratings):
    sample_user = pd.Series(ratings)
    predicted_genre = model._predict(sample_user)
    return predicted_genre


def predict_subsequent_random_users(k, test_size, ratings):
    model_path = os.path.join('algorithms', 'models', 'user_based_common_movies')
    model_id = f'k{k}test{test_size}'
    filename = os.path.join(model_path, f'model_{model_id}.sav')
    model = load(filename)
    sample_user = pd.Series(ratings)
    predicted_genre = model._predict(sample_user)
    return predicted_genre


if __name__ == '__main__':
    test = []
    for i in range(0, 15):
        test.append(random.randint(0, 5))
    # apply_knn_user_based_common_movies(5, 20, test)