from flask import Flask, request, json
from algorithms.knn import apply_knn_user_based_common_movies, predict_random_user

app = Flask(__name__)


@app.route('/api/knn/user-based-common-movies/accuracy', methods=['POST'])
def get_accuracy():
  k = json.loads(request.data)['k_value']
  test_size = json.loads(request.data)['test_size']
  accuracy = apply_knn_user_based_common_movies(k, test_size)
  return {'accuracy': accuracy}


@app.route('/api/knn/user-based-common-movies/random-user', methods=['POST'])
def get_favourite_genre():
  k = json.loads(request.data)['k_value']
  test_size = json.loads(request.data)['test_size']
  ratings = json.loads(request.data)['ratings']
  genre = predict_random_user(k, test_size, ratings)
  return {'genre': genre}


if __name__ == '__main__':
  app.run(debug=True)