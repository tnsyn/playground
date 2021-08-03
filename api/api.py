from flask import Flask, request, json
from algorithms.knn import apply_knn

app = Flask(__name__)

@app.route('/api/knn/k', methods=["GET",'POST'])
def set_k():
  k = json.loads(request.data)['k_value']
  accuracy = apply_knn(k)
  return {'accuracy': accuracy}


if __name__ == '__main__':
  app.run(debug=True)