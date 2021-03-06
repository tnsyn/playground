import pandas as pd 
from sklearn.model_selection import train_test_split
import numpy as np
from sklearn.neighbors import NearestNeighbors
from sklearn.metrics import confusion_matrix
from scipy.sparse import csr_matrix
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


    def predict_genre(self, X):
        predictions = [self._predict_genre(x) for x in X]
        return np.array(predictions)


    def _predict_genre(self, x):
        # Compute distances between current user and all other users
        distances = [euclidean_distance(x, x_train) for x_train in self.X_train]
        

        # Find smallest k distances to find k nearest neighbours
        k_indices = np.argsort(distances)[:int(self.k)]

        # Find out favourite genre of each neighbour
        neighbour_genres = [self.y_train[i] for i in k_indices]

        # Among the k nearest neighbours, find out the most common genre
        most_common_genre = Counter(neighbour_genres).most_common(1)

        return most_common_genre[0][0]
    
    def recommend_movies(self, x, no_of_recommendations):
        distances = [euclidean_distance(x, x_train) for x_train in self.X_train]
        # Find smallest k distances to find k nearest neighbours
        k_indices = np.argsort(distances)[:int(self.k)]

        # Find out the list of top movies for each neighbour
        neighbour_movies = [self.y_train[i] for i in k_indices]

        # Among the k nearest neighbours, find out the most common movies
        unpacked_movies = []
        for entry in neighbour_movies:
            split = entry.replace("',", '",').replace(" '", ' "').replace("['", '["').replace("']", '"]').split('", "')
            for movie in split:
                processed_movie = movie
                if '["' in movie: 
                    processed_movie = movie.replace('["', '')
                if '"]' in movie:
                    processed_movie = movie.replace('"]', '')
                unpacked_movies.append(processed_movie)

        most_common_movies = Counter(unpacked_movies).most_common(no_of_recommendations)
        return most_common_movies


def apply_knn_user_based_common_movies(k, test_size, ratings):
    # Create a new directory to store the models if the folder does not exist yet
    model_path = os.path.join('algorithms', 'models', 'user_based_common_movies')
    if not os.path.exists(model_path):
        os.makedirs(model_path, mode=0o777)
    
    # Test dataset size given as a percentage, convert it to decimal
    converted_test_size = test_size / 100

    # Read in the dataset
    dataset = pd.read_csv('dataset/user_based_common_movies.csv')
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
        predictions = model.predict_genre(X_test)
        accuracy = np.sum(predictions == y_test) / len(y_test)
        genre = predict_first_random_user(model, ratings)
        return {'accuracy': accuracy, 'genre': genre}

    model = knn(k)
    model.fit(X_train, y_train)
    dump(model, filename)
    predictions = model.predict_genre(X_test)
    accuracy = np.sum(predictions == y_test) / len(y_test)
    genre = predict_first_random_user(model, ratings)
    return {'accuracy': accuracy, 'genre': genre}


# Take in a list of random ratings (0 - 5 inclusive) to create a sample user
# Use model to predict sample user's favourite genre
def predict_first_random_user(model, ratings):
    sample_user = pd.Series(ratings)
    predicted_genre = model._predict_genre(sample_user)
    return predicted_genre


def predict_subsequent_random_users(k, test_size, ratings):
    model_path = os.path.join('algorithms', 'models', 'user_based_common_movies')
    model_id = f'k{k}test{test_size}'
    filename = os.path.join(model_path, f'model_{model_id}.sav')
    model = load(filename)
    sample_user = pd.Series(ratings)
    predicted_genre = model._predict_genre(sample_user)
    return predicted_genre


def apply_knn_user_based_average_ratings(k, test_size, ratings, no_of_recommendations):
    # Create a new directory to store the models if the folder does not exist yet
    model_path = os.path.join('algorithms', 'models', 'user_based_average_ratings')
    if not os.path.exists(model_path):
        os.makedirs(model_path, mode=0o777)
    
    # Test dataset size given as a percentage, convert it to decimal
    converted_test_size = test_size / 100

    # Read in the dataset
    dataset = pd.read_csv('dataset/user_based_avg_ratings.csv')
    # Split dataset into training set and testing set
    X = dataset.drop(columns=['userId', 'titles']).values
    y = dataset['titles'].values
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=converted_test_size, random_state=1234)

    # Generate ID for new model created
    # ID will be stored in the format - k{k}test{test_size} in string format
    model_id = f'k{k}test{test_size}'
    filename = os.path.join(model_path, f'model_{model_id}.sav')
    if os.path.exists(filename):
        model = load(filename)
        sample_user = pd.Series(ratings)
        recommendations = model.recommend_movies(sample_user, no_of_recommendations)
        return recommendations
    else:
        model = knn(k)
        model.fit(X_train, y_train)
        dump(model, filename)
        sample_user = pd.Series(ratings)
        recommendations = model.recommend_movies(sample_user, no_of_recommendations)
        return recommendations


def apply_knn_item_based_movie_ratings(no_of_recommendations, given_movie):
    movies = pd.read_csv('dataset/movies.csv')
    dataset = pd.read_csv('dataset/item_based_movie_ratings.csv')

    csr_data = csr_matrix(dataset.values)
    model = NearestNeighbors(metric="cosine", algorithm="brute", n_neighbors=no_of_recommendations + 1, n_jobs=-1)
    model.fit(csr_data)

    dataset.reset_index(inplace=True)
    # See if provided movie exists in the dataset
    movie_list = movies[movies['title'].str.contains(given_movie)]
    if len(movie_list):
        # Extract the movieId
        movieId = movie_list.iloc[0]['movieId']
        # Extract the index of the movie in the dataset
        index = dataset[dataset['movieId'] == movieId].index[0]
        distances, indices = model.kneighbors(csr_data[index])
        combined_index_distance = list(zip(distances.squeeze().tolist(), indices.squeeze().tolist()))[1:]
        sorted_results = sorted(combined_index_distance)

        recommendations = []
        for entry in sorted_results:
            index = entry[1]
            movie_id = dataset.iloc[index]['movieId']
            movie_title = movies[movies['movieId'] == movie_id]['title'].values[0]
            recommendations.append(movie_title)
        return recommendations
    else:
        return


if __name__ == '__main__':
    test = []
    for i in range(0, 19):
        test.append(random.randint(0, 5))
    # apply_knn_user_based_average_ratings(4, 20, test)
    # apply_knn_user_based_common_movies(5, 20, test)
    get_recommended_movies(10, 'Iron Man')