from flask import Flask, request, json, abort, Response
from algorithms.knn import apply_knn_user_based_common_movies, predict_subsequent_random_users, apply_knn_user_based_average_ratings, apply_knn_item_based_movie_ratings
from utils import get_random_movie


app = Flask(__name__)


@app.route('/api/knn/user-based-common-movies/random-user', methods=['POST'])
def get_favourite_genre():
  k = json.loads(request.data)['k_value']
  test_size = 100 - json.loads(request.data)['train_size']
  ratings = json.loads(request.data)['ratings']
  genre = predict_subsequent_random_users(k, test_size, ratings)
  return {'genre': genre}


@app.route('/api/knn/user-based-common-movies', methods=['POST'])
def run_common_movies_and_predict():
  k = json.loads(request.data)['k_value']
  test_size = 100 - json.loads(request.data)['train_size']
  ratings = json.loads(request.data)['ratings']
  results = apply_knn_user_based_common_movies(k, test_size, ratings)
  return results


@app.route('/api/knn/user-based-average-ratings', methods=['POST'])
def run_average_ratings_and_predict():
  k = json.loads(request.data)['k_value']
  test_size = 100 - json.loads(request.data)['train_size']
  average_ratings = json.loads(request.data)['ratings']
  no_of_recommendations = int(json.loads(request.data)['no_of_recommendations'])
  result = apply_knn_user_based_average_ratings(k, test_size, average_ratings, no_of_recommendations)
  recommendations = []
  for r in result:
    recommendations.append(r[0])
  return {'movies': recommendations}


@app.route('/api/knn/item-based-movie-ratings', methods=['POST'])
def run_movie_ratings_and_predict():
  no_of_recommendations = int(json.loads(request.data)['no_of_recommendations'])
  given_movie = json.loads(request.data)['given_movie']
  recommendations = apply_knn_item_based_movie_ratings(no_of_recommendations, given_movie)
  if not recommendations: 
    return Response(status=404)
  return {'movies': recommendations}


@app.route('/api/knn/item-based-movie-ratings/random-movie', methods=["GET"])
def get_movie():
  movie = get_random_movie()
  return {'movie': movie}


if __name__ == '__main__':
  app.run(debug=True)