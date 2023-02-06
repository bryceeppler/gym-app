import psycopg2
import datetime
import os

# DATABASE_URL=
conn = psycopg2.connect('postgresql://postgres:postgres@localhost:5432/workout_app')
cur = conn.cursor()

workout_list = []
# onslaught.txt has workouts formatted like this:

# Workout title
# Workout description
# ...

# BREAK
# Workout title
# Workout description
# ...

# We want to add them to the DB like this:
# (workout_number, workout_str, title)
# Where workout_str is the entire workout description, and title is the first line after BREAK
today = datetime.datetime.now()
with open('onslaught.txt', 'r') as f:

    workout_str = ""
    title = ""
    workout_number = 0
    # date = today + workout_number days
    date = today + datetime.timedelta(days=workout_number)

    for line in f:
        if line.strip() == "BREAK":
            workout_list.append((workout_number, workout_str, title, date))
            workout_number += 1
            date = today + datetime.timedelta(days=workout_number)
            workout_str = ""
            title = ""
        elif title == "":
            title = line.strip()
        else:
            workout_str += line

    # add the last workout to the list
    workout_list.append((workout_number, workout_str, title, date))

    # insert the workout into the DB
    for workout in workout_list:
        cur.execute("INSERT INTO workouts (workout_number, workout_str, title, date) VALUES (%s, %s, %s, %s)", workout)

    conn.commit()
    cur.close()
    conn.close()
