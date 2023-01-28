import React from "react";
import { useWorkoutModalStore } from "../store";

interface Workout {
  id: number;
  completedAt: Date | null;
  title: string | null;
  userId: number;
  workoutId: number;
  status: string | null;
}
// this is what gets passed in as props
// const userCompletedWorkouts: typeof completedWorkouts = completedWorkouts as Workout[];

// so we need our props to look like

type Props = {
  completedWorkouts: Workout[];
};

export default function WorkoutHistoryModal({ completedWorkouts }: Props) {
  const { showWorkoutHistoryModal, setShowWorkoutHistoryModal } =
    useWorkoutModalStore();
  console.log(completedWorkouts);
  return (
    <div
      className="fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => {
        e.preventDefault();
        setShowWorkoutHistoryModal(!showWorkoutHistoryModal);
      }}
    >
      <div className="z-30 flex h-auto w-full max-w-md flex-col items-center justify-center rounded bg-gray-700 p-5 text-white"
        onClick={(e) => {
            e.stopPropagation();
        }}
      >
        <div className="text-xl font-bold">Workout History</div>
        <div className="flex flex-col items-center justify-center space-y-2 w-full 
            overflow-y-auto max-h-96
        ">
          {completedWorkouts?.map((workout: Workout, index) => {
            return (
              <div key={index} className="transition-all grid grid-cols-12 w-full p-3 bg-gray-600 hover:bg-gray-700 rounded-sm">
                <div className="text-md col-span-4 font-bold">{workout.title}</div>
                <div className="text-sm col-span-5">{workout.completedAt?.toDateString()}</div>
                <div className={`text-sm col-span-3  p-1  text-center rounded-sm bg-opacity-30
                    ${workout.status === "completed" ? "bg-green-500" : "bg-red-500"}
                `}>{workout.status}</div>
                <div className="col-span-12">
                    <div className="flex flex-row space-x-5 justify-center items-center mt-4">
                        <button className="rounded bg-red-600 px-2 text-sm text-white transition-all hover:bg-red-500">Remove</button>
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
