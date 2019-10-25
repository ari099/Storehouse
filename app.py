#!/bin/python

from flask import *
from custom import query

# Flask app object...
app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    if request.method == 'POST':
        content = request.json
        db_name = content["db_name"]
        sql = content["query"]
        results = query(db_name, sql)
        return json.dumps(results)

    return render_template('index.html', page='Home Page')

@app.route('/about/', methods=['GET'])
def about():
    return render_template('about.html', page='Home Page')

@app.route('/contact/', methods=['GET'])
def contact():
    return render_template('contact.html', page='Home Page')

if __name__ == '__main__':
    app.run(debug=True)
