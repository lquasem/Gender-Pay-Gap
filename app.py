import os

import pandas as pd
import numpy as np

from flask import Flask, request, render_template, jsonify

import psycopg2 as pg
import pandas.io.sql as psql
# import example_psql as creds
import sys, os
import json
import pprint
# from sqlalchemy import create_engine


# app = Flask(__name__)
app = Flask(__name__, template_folder="templates", static_folder="static")
# get connected to the database
connection = pg.connect("dbname=gender_pay_gap user=postgres password='database'")
dataframe = psql.read_sql_query("SELECT * FROM pay_gap_by_education", connection)

print(dataframe)

# men_education = dataframe.loc[dataframe["gender"] == "Male"]
# men_education = men_education.replace(
#     {"Men, 25 years and over": "25 years and over"})
# men_dict = men_education.to_dict('dict')
# dic = men_dict.get('education_level', 'median_weekly_earnings_in_2016')
# pprint.pprint(dic)
# pprint.pprint(men_dict)
# women_education = dataframe.loc[dataframe["gender"] == "Female"]
# women_education = women_education.replace(
#     {"Women, 25 years and over": "25 years and over"})
# print(women_education)
# print(list(women_education.columns))



  
# try: 
#     connection = pg.connect(user = "postgres",
#                                     password = "database",
#                                     host = "127.0.0.1",
#                                     port = "5432",
#                                     database = "gender_pay_gap")
#     cursor = connection.cursor()
#     # Print PostgreSQL Connection properties
#     print ( connection.get_dsn_parameters(),"\n")

#     cursor.callproc('pay_gap_by_education')
#     for row in results:
#         print("id = ", row[0], )
#         print("eduvation_level = ", row[1])
#         print("median_weekly_earnings_in_2018  = ", row[2])


#     # # Print PostgreSQL version
#     # cursor.execute("SELECT version();")
#     # record = cursor.fetchone()
#     # print("You are connected to - ", record,"\n")
# except (Exception, pg.Error) as error :
#     print ("Error while connecting to PostgreSQL", error)
# finally:
#     #closing database connection.
#         if(connection):
#             cursor.close()
#             connection.close()
#             print("PostgreSQL connection is closed")

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/names")
def names():
    return jsonify(dataframe.to_dict())

    


# @app.route("/details")
# def get_book_details():
#     author=request.args.get('author')
#     published=request.args.get('published')
#     return "Author : {}, Published: {}".format(author,published)


if __name__ == '__main__':
    app.run()