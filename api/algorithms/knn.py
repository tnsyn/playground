import pandas as pd 
from sklearn.model_selection import train_test_split
import numpy as np
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import confusion_matrix
import random

import numpy as np 
from collections import Counter


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
        print(self.X_train)
        # Compute distances between current user and all other users
        distances = [euclidean_distance(x, x_train) for x_train in self.X_train]

        # Find smallest k distances to find k nearest neighbours
        k_indices = np.argsort(distances)[:self.k]

        # Find out favourite genre of each neighbour
        neighbour_genres = [self.y_train[i] for i in k_indices]

        # Among the k nearst neighbours, find out the most common genre
        most_common_genre = Counter(neighbour_genres).most_common(1)

        return most_common_genre[0][0]


def apply_knn(k):
  # Read in the dataset
  dataset = pd.read_csv('dataset/preliminary_dataset.csv')

  # Split dataset into training set and testing set
  X = dataset.drop(columns=['userId', 'favourite_genre']).values

  y = dataset['favourite_genre'].values
  X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=1234)

  model = knn(k)
  model.fit(X_train, y_train)
  predictions = model.predict(X_test)


  accuracy = np.sum(predictions == y_test) / len(y_test)
  return accuracy


if __name__ == '__main__':
    apply_knn(5)