# Connect to db
# Given a workout number, change the date of that workout and all workouts after that workout to the next day

import psycopg2
import sys
import datetime
import os




WORKOUT_NUM = 5
# Connect to db
try:
    # localhost:5432 postgres postgres postgres
    conn = psycopg2.connect("dbname='workout_app' user='postgres' host='localhost' password='postgres'")
except:
    print("I am unable to connect to the database")
    
cur = conn.cursor()

# update all workouts where workout_number >= WORKOUT_NUM, then update the date of each workout to the next day
cur.execute("SELECT date FROM workouts WHERE workout_number = %s", (WORKOUT_NUM,))
workout_date = cur.fetchone()[0]
cur.execute("SELECT workout_number, date FROM workouts WHERE workout_number >= %s", (WORKOUT_NUM,))
workouts = cur.fetchall()
for workout in workouts:
    workout_number = workout[0]
    workout_date = workout[1]
    next_day = workout_date + datetime.timedelta(days=1)
    cur.execute("UPDATE workouts SET date = %s WHERE workout_number = %s", (next_day, workout_number))
conn.commit()




