import { workouts } from "@prisma/client";
import React from "react";
import { useWorkoutModalStore } from "../store";

type Props = {
  workouts?: workouts[];
};

// export default function UpcomingWorkouts({}: Props) {
  export default function UpcomingWorkouts({ workouts }: Props) {

  const { setShowWorkoutModal, setSelectedWorkout } = useWorkoutModalStore();
  console.log("workouts", workouts)
  return (
    <div className="flex flex-col text-left">
      <div className="my-2 text-lg font-bold text-white">Upcoming</div>
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        {workouts?.slice(0,4).map((workout) => {
          return (
            <div
              key={workout.id}
              className="flex w-full flex-col rounded bg-paper p-4 text-white transition-colors hover:bg-base"
              onClick={() => {
                setSelectedWorkout(workout);
                setShowWorkoutModal(true);
              }
              }
            >
              <div className="font-bold ">{workout.title}</div>
              {/* Date should be format "Feb 24" */}
              <div className="text-sm text-gray-400">{workout.date.toLocaleDateString('default', { month: 'short', day: 'numeric' })}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
