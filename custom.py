import os, sys
import json
import sqlite3

def get_filename(pathname):
    '''
    Get filename without the extension
    :param pathname:
    '''
    return os.path.splitext(pathname)[0]

def get_extension(pathname):
    '''
    Get extension of a filename
    :param pathname:
    '''
    return os.path.splitext(pathname)[1]

# Important methods
def query(db_name, sql):
    '''
    Query the database
    :param sql:
    '''
    results = None
    try:
        db = sqlite3.connect("./db/" + db_name + ".sqlite3")
        if sql[0:6].lower() == 'select':
            cursor = db.execute(sql)
            results = list()
            for row in cursor:
                results.append(row)
        else:
            db.execute(sql)
            db.commit()
    except ValueError as e:
        print('Error on line {}:'.format(sys.exc_info()[-1].tb_lineno), e)
    finally:
        db.close()
        if results is not None:
            return results
