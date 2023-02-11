import React, { useEffect } from "react";
import { workouts, users, completedWorkouts, cardioSession, icePlunge } from "@prisma/client";

type Props = {
  workouts?: workouts[];
  user?: users;
  completedWorkouts?: completedWorkouts[];
  cardioSessions?: cardioSession[];
  icePlunges?: icePlunge[];
};

export default function HistoryGrid({
  workouts,
  user,
  completedWorkouts,
  icePlunges,
  cardioSessions
}: Props) {
  const i = 45;
  const [points, setPoints] = React.useState(0);
  useEffect(() => {
   const icePlungesPoints = icePlunges?.length
    const cardioSessionsPoints = cardioSessions?.length
    const completedWorkoutsPoints = completedWorkouts?.filter((completedWorkout) => {
      return completedWorkout.status === "completed"
    }).length
    const newPoints = (icePlungesPoints || 0 )+ (cardioSessionsPoints || 0 )+ (completedWorkoutsPoints || 0 )
    setPoints(newPoints);
  }, [icePlunges, cardioSessions, completedWorkouts]);

  console.log(icePlunges);
  return (
    <div className="flex flex-col text-white mx-auto">
      <div className="text-lg font-bold">{user?.username}</div>
      <div className="text-gray-400">{points} points</div>
      <div className="mt-2 h-fit w-fit flex flex-wrap">
        {workouts?.map((workout, i) => (
          <div
            key={i}
            className={`m-0.5 h-4 w-4 bg-base ${
              completedWorkouts?.find((completedWorkout) => {
                return (
                  completedWorkout.workoutId === workout.id &&
                  completedWorkout.status === "completed"
                );
              }) ? "bg-green-500": 
              completedWorkouts?.find((completedWorkout) => {
                return (
                  completedWorkout.workoutId === workout.id &&
                  completedWorkout.status === "skipped"
                );
              }
              ) ? "outline outline-1 outline-gray-500 -outline-offset-1" : "bg-base"

            }`}
          />
        ))}
      </div>
    </div>
  );
}
