from flask import Flask, request, json
from algorithms.knn import apply_knn_user_based_common_movies, predict_subsequent_random_users

app = Flask(__name__)


@app.route('/api/knn/user-based-common-movies/random-user', methods=['POST'])
def get_favourite_genre():
  k = json.loads(request.data)['k_value']
  test_size = 100 - json.loads(request.data)['train_size']
  ratings = json.loads(request.data)['ratings']
  genre = predict_subsequent_random_users(k, test_size, ratings)
  return {'genre': genre}


@app.route('/api/knn/user-based-common-movies', methods=['POST'])
def run_model_and_predict():
  k = json.loads(request.data)['k_value']
  test_size = 100 - json.loads(request.data)['train_size']
  ratings = json.loads(request.data)['ratings']
  results = apply_knn_user_based_common_movies(k, test_size, ratings)
  return results


if __name__ == '__main__':
  app.run(debug=True)