// zustand store
import { useEffect } from "react";
import { useWorkoutModalStore } from "../store";
import { api } from "../utils/api";

type Props = {
  userId: number;
};

export default function WorkoutModal({userId}: Props) {
  const utils = api.useContext();
  const {
    showWorkoutModal,
    setShowWorkoutModal,
    selectedWorkout,
  } = useWorkoutModalStore();
  const today = new Date();
  const completeWorkout = api.example.completeWorkout.useMutation(
    {
      onSuccess: () => {
        // invalidate query to update the UI
        utils.example.getUncompletedWorkouts.invalidate()
        .catch((err) => console.log(err));
        utils.example.getUserStats.invalidate()
        .catch((err) => console.log(err));
        utils.example.getCompletedWorkouts.invalidate()
        .catch((err) => console.log(err));
        utils.example.getAllUserScores.invalidate()
        .catch((err) => console.log(err));
        utils.workout.getCompletedWorkouts.invalidate()
        .catch((err) => console.log(err));
      },
    }
  );

    useEffect(() => {
      console.log("selectedWorkout", selectedWorkout);
    }, [selectedWorkout]);
  return (
    <div
      className="fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => {
        e.preventDefault();
        setShowWorkoutModal(!showWorkoutModal);
      }}
    >
      <div className="z-30 flex h-auto w-full max-w-md flex-col items-center justify-center rounded bg-gray-700 text-white py-5 px-2"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }
      }>
        {/* print workout_str including the newlines */}
        <div className="text-xl font-bold">{selectedWorkout.title}</div>
        <div className="text-sm">
          {
            // todays date
            today.toDateString().split(" ").slice(1, 3).join(" ")
          }
        </div>
        {/* Workout description */}
        <div className="text-sm mt-4 overflow-y-scroll h-96 w-full space-y-1 p-2">
          {
            // print workout_str including the newlines
            selectedWorkout.workout_str?.split("\n").map((line, i) => (
              <div key={i}>{line}</div>
            ))
          }
        </div>
        <div className="flex flex-row items-center justify-center space-x-2">
          <button
            className="my-4 rounded bg-red-600 p-2 text-white transition-all hover:bg-red-500"
            onClick={(e) => {
              e.preventDefault();
              setShowWorkoutModal(!showWorkoutModal);
              completeWorkout.mutate({
                id: selectedWorkout.id,
                status: "skipped",
                title: selectedWorkout.title || "",
                userId: userId,
              });
              // invalidate query to update the UI
              // utils.example.getUncompletedWorkouts.invalidate();
              // utils.example.getUncompletedWorkouts.invalidate();
            }}
          >
            Skip workout
          </button>
          <button
            className="my-4 rounded bg-blue-600 p-2 text-white transition-all hover:bg-blue-500"
            onClick={(e) => {
              e.preventDefault();
              completeWorkout.mutate({
                id: selectedWorkout.id,
                status: "completed",
                title: selectedWorkout.title || "",
                userId: userId,
              });

              setShowWorkoutModal(!showWorkoutModal);
            }}
          >
            Complete workout
          </button>
        </div>
      </div>
    </div>
  );
}
