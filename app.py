#!/bin/python

from flask import *
import os
import json
from custom import query, get_extension, get_filename
from werkzeug import secure_filename

# Flask app object...
app = Flask(__name__)

@app.route('/', methods=['GET','POST'])
def index():
    if request.method == 'POST':
        content = request.json
        print(content)
        db_name = content["db_name"]
        sql = content["sql"]
        results = query(db_name, sql)
        return json.dumps(results)

    return render_template('index.html', page='Home Page')

@app.route('/upload_db_file/', methods=['POST'])
def upload_db_file():
    new_file = request.files['db_file_upload']
    if get_extension(new_file.filename) not in ('.sqlite3', 'db'):
        return json.dumps({'name': None, 'extension': None})

    # data = json.load(request.files['db_file_upload'])
    filename = secure_filename(new_file.filename)
    fileinfo = {
        'name': get_filename(new_file.filename),
        'extension': get_extension(new_file.filename)
    }
    # new_file.save(os.path.join('./db', filename))
    # print(data)
    return json.dumps(fileinfo)

@app.route('/about/', methods=['GET'])
def about():
    return render_template('about.html', page='Home Page')

@app.route('/contact/', methods=['GET'])
def contact():
    return render_template('contact.html', page='Home Page')

if __name__ == '__main__':
    app.run(debug=True)
