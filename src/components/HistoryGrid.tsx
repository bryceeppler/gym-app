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
  // export default function HistoryGrid() {
  const i = 45;
  const [points, setPoints] = React.useState(0);
  useEffect(() => {
   // ice plunges worth 1 point
   // cardio sessions worth 1 point
   // 1 point for every completedworkout where status === "completed"
   // -1 point for every completedworkout where status === "skipped"
   const icePlungesPoints = icePlunges?.length
    const cardioSessionsPoints = cardioSessions?.length
    const completedWorkoutsPoints = completedWorkouts?.filter((completedWorkout) => {
      return completedWorkout.status === "completed"
    }).length
    const skippedWorkoutsPoints = completedWorkouts?.filter((completedWorkout) => {
      return completedWorkout.status === "skipped"
    }).length
    const newPoints = (icePlungesPoints || 0 )+ (cardioSessionsPoints || 0 )+ (completedWorkoutsPoints || 0 )- (skippedWorkoutsPoints || 0)
    setPoints(newPoints);
  }, [icePlunges, cardioSessions, completedWorkouts]);

  console.log(icePlunges);
  return (
    <div className="flex flex-col text-white">
      <div className="text-lg font-bold">{user?.username}</div>
      <div className="text-gray-400">{points} points</div>
      <div className="mt-2 grid h-fit w-fit grid-cols-7 gap-1">
        {/* {[...Array(i)].map((_, i) => ( */}
        {workouts?.map((workout, i) => (
          <div
            key={i}
            className={`h-4 w-4 bg-base ${
              // if there is a workout in completedWorkouts with workoutId === workout.id and status === "completed" color green
              // if it is skipped color red
              // if it is not completed or skipped color gray

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
              ) ? "bg-red-700" : "bg-base"

            }`}
          />
        ))}
      </div>
    </div>
  );
}
