// zustand store
import { useEffect } from "react";
import { useWorkoutModalStore } from "../store";
import { api } from "../utils/api";

// type Props = {
//     userId: number;
// };

// export default function WorkoutModal({userId}: Props) {
export default function WorkoutModal() {
  const utils = api.useContext();
  const { showWorkoutModal, setShowWorkoutModal, selectedWorkout, userId } =
    useWorkoutModalStore();
  const today = new Date();
  const completeWorkout = api.workouts.completeWorkout.useMutation({
    onSuccess: () => {
      // invalidate query to update the UI
      utils.workouts.getIncompleteWorkouts
        .invalidate()
        .catch((err) => console.log(err));
      utils.users.getUserList.invalidate().catch((err) => console.log(err));
      // utils.example.getUncompletedWorkouts.invalidate()
      // .catch((err) => console.log(err));
    },
  });

  useEffect(() => {
    console.log("selectedWorkout", selectedWorkout);
  }, [selectedWorkout]);
  return (
    <div
      className="fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-70"
      onClick={(e) => {
        e.preventDefault();
        setShowWorkoutModal(!showWorkoutModal);
      }}
    >
      <div
        className="z-30 mx-4 flex w-full max-w-md flex-col items-center justify-center rounded bg-baselight py-5 px-2 text-white h-3/4"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {/* close btn */}
        <div className="absolute top-0 right-0 mt-2 mr-2">
          <button
            className="h-8 w-8 rounded-full bg-gray-600 hover:bg-gray-500"
            onClick={(e) => {
              e.preventDefault();
              setShowWorkoutModal(!showWorkoutModal);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-8 text-white "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* print workout_str including the newlines */}
        <div className="text-lg font-bold">{selectedWorkout.title}</div>

        {/* Workout description */}
        {selectedWorkout?.workout_str?.length ? (
          //  whitespace

          <div className="mt-4 w-full space-y-1 overflow-y-scroll whitespace-pre-wrap p-2 text-sm">
            {<div>{selectedWorkout.workout_str}</div>}
          </div>
        ) : (
          ""
        )}
        <div className="flex flex-row items-center justify-center space-x-2">
          <button
            className="my-4 rounded bg-red-500 p-2 text-white transition-all hover:bg-opacity-50"
            onClick={(e) => {
              e.preventDefault();
              setShowWorkoutModal(!showWorkoutModal);
              completeWorkout.mutate({
                id: selectedWorkout.id,
                status: "skipped",
                title: selectedWorkout.title || "",
                userId: userId,
              });
            }}
          >
            Skip
          </button>
          <button
            className="my-4 rounded bg-lightpurple p-2 text-white transition-all hover:bg-opacity-50"
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
            Complete
          </button>
        </div>
      </div>
    </div>
  );
}
