from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import kociemba


app = Flask(__name__, static_url_path='/static')
CORS(app)


@app.route('/')
def index():
    return render_template('/index.html')


@app.route('/test', methods=['POST'])
def test():

    data = request.get_json()  # Get the JSON data from the POST request
    scrambled_state = data
    solution = kociemba.solve(scrambled_state)

    response = jsonify(solution=solution)

    return response


if __name__ == '__main__':
    app.run(debug=True)
