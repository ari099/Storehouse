import os, sys
import json
import sqlite3

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
