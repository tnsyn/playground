from flask import Flask, request, json
from algorithms.knn import apply_knn_user_based_common_movies, predict_subsequent_random_users, apply_knn_user_based_average_ratings

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
  result = apply_knn_user_based_average_ratings(k, test_size, average_ratings)
  recommendations = []
  for r in result:
    recommendations.append(r[0])
  return {'movies': recommendations}


if __name__ == '__main__':
  app.run(debug=True)