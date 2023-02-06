# Connect to db
# Given a workout number (NOT ID), change the workout_number of that workout and all workouts after that workout to workout_number + 1

import psycopg2
import datetime

WORKOUT_NUM = 7
# Connect to db
try:
    # localhost:5432 postgres postgres postgres
    conn = psycopg2.connect("dbname='workout_app' user='postgres' host='localhost' password='postgres'")
except:
    print("I am unable to connect to the database")
    
cur = conn.cursor()


# Get the workout with the given workout number
cur.execute("SELECT id, workout_number FROM workouts WHERE workout_number = %s", (WORKOUT_NUM,))
row = cur.fetchone()
# For each workout with a workout number >= given workout number, increment the workout number
# and change the date of the row to the next day
cur.execute("SELECT id, workout_number FROM workouts WHERE workout_number >= %s ORDER BY workout_number ASC", (WORKOUT_NUM,))
rows = cur.fetchall()
for row in rows:
    cur.execute("UPDATE workouts SET workout_number = %s WHERE id = %s", (row[1] + 1, row[0]))


# Commit the changes
conn.commit()

# Close the connection
cur.close()
conn.close()