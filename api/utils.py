import pandas as pd 
import random

def get_random_movie():
  movies = pd.read_csv('dataset/movies.csv')
  dataset = pd.read_csv('dataset/item_based_movie_ratings.csv')
  random_index = random.randint(0, len(dataset))
  random_id = dataset['movieId'][random_index]
  random_movie = movies[movies['movieId'] == random_id]['title'].values[0]
  random_movie_processed = random_movie.split(' (')[0]
  return random_movie_processed


if __name__ == '__main__':
  get_random_movie()