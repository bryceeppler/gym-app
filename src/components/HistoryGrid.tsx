import React from "react";
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
  console.log(icePlunges);
  return (
    <div className="flex flex-col text-white">
      <div className="text-lg font-bold">{user?.username}</div>
      <div className="text-gray-400">45 points</div>
      <div className="mt-2 grid h-fit grid-cols-7 gap-1">
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
