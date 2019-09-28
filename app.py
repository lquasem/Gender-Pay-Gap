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
connection = pg.connect("dbname=gender_pay_gap user=postgres password='Pent!1782'")
pay_gap_by_education = psql.read_sql_query("SELECT * FROM pay_gap_by_education", connection)
pay_gap_by_race_df = psql.read_sql_query("SELECT * FROM pay_gap_by_race", connection)
print(pay_gap_by_race_df)

@app.route("/globalData")
def getGlobalData():

   fpath = "../cleaned_data/countries.geojson"
   with open(fpath) as f: contents = f.read()
   print(contents)
   return contents


@app.route("/byRace")
def byRaceData():
    return jsonify(pay_gap_by_race_df.to_dict())

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/byEducation")
def names():
    return jsonify(pay_gap_by_education.to_dict())


if __name__ == '__main__':
    app.run(port=1234)
