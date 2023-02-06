# Connect to db
# Given a workout number (NOT ID), change the date of that workout and all workouts after that workout to the next day
# and the workout numbers to +1
# After shifting all of the workouts, add a new workout with the proper date and a title of "Rest"

import psycopg2
import datetime

WORKOUT_NUM = 5
# Connect to db
try:
    # localhost:5432 postgres postgres postgres
    conn = psycopg2.connect("dbname='workout_app' user='postgres' host='localhost' password='postgres'")
except:
    print("I am unable to connect to the database")
    
cur = conn.cursor()


# Get the workout with the given workout number
cur.execute("SELECT id, workout_number, date FROM workouts WHERE workout_number = %s", (WORKOUT_NUM,))
row = cur.fetchone()
old_date = row[2]

# For each workout with a workout number >= given workout number, increment the workout number
# and change the date of the row to the next day
cur.execute("SELECT id, workout_number, date FROM workouts WHERE workout_number >= %s ORDER BY workout_number ASC", (WORKOUT_NUM,))
rows = cur.fetchall()
for row in rows:
    cur.execute("UPDATE workouts SET workout_number = %s, date = %s WHERE id = %s", (row[1] + 1, row[2] + datetime.timedelta(days=1), row[0]))

# Add a new workout with the proper date and a title of "Rest"
cur.execute("INSERT INTO workouts (workout_number, date, title) VALUES (%s, %s, %s)", (WORKOUT_NUM, old_date, "Rest"))

# Commit the changes
conn.commit()

# Close the connection
cur.close()
conn.close()