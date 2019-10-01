import os

import pandas as pd
import numpy as np

from flask import Flask, request, render_template, jsonify

import psycopg2 as pg
import pandas.io.sql as psql

import sys, os
import json
import pprint

app = Flask(__name__, template_folder="templates", static_folder="static")
# get connected to the database
connection = pg.connect("dbname=gender_pay_gap user=postgres password='data'")
dataframe = psql.read_sql_query("SELECT * FROM pay_gap_by_education", connection)
pay_gap_by_race_df = psql.read_sql_query("SELECT * FROM pay_gap_by_race", connection)

print(dataframe)

dataframe = dataframe.replace(
    {"Men, 25 years and over": "25 years and over",
    "Women, 25 years and over": "25 years and over"})
pprint.pprint(dataframe)

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/globalData")
def getGlobalData():
    fpath = "cleaned_data/countries.geojson"
    with open(fpath) as f: contents = f.read()
    return contents

@app.route("/byRace")
def byRaceData():
   return jsonify(pay_gap_by_race_df.to_dict())

@app.route("/byEducation")
def names():
    return jsonify(dataframe.to_dict())

if __name__ == '__main__':
    app.run()

# if __name__ == '__main__':
    # app.run(port=8000)
