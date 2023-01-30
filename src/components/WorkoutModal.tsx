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
//   const completeWorkout = api.example.completeWorkout.useMutation(
//     {
//       onSuccess: () => {
//         // invalidate query to update the UI
//         // utils.example.getUncompletedWorkouts.invalidate()
//         // .catch((err) => console.log(err));

//       },
//     }
//   );

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
      <div className="z-30 flex h-auto w-full max-w-md flex-col items-center justify-center rounded bg-base text-white py-5 px-2 mx-4"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }
      }>
                {/* close btn */}
                <div className="absolute top-0 right-0 mt-2 mr-2">
          <button
            className="h-8 w-8 bg-gray-600 rounded-full hover:bg-gray-500"
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
        <div className="text-xl font-bold">{selectedWorkout.title}</div>

        {/* Workout description */}
        {selectedWorkout?.workout_str?.length?
         (
        //  whitespace

         <div className="text-sm mt-4 overflow-y-scroll max-h-96 w-full space-y-1 p-2 whitespace-pre-wrap">
          {
            <div>{selectedWorkout.workout_str}</div>
              
          }
        </div>): ""
}
        <div className="flex flex-row items-center justify-center space-x-2">
          <button
            className="my-4 rounded bg-red-400 p-2 text-white transition-all hover:bg-red-500"
            onClick={(e) => {
              e.preventDefault();
              setShowWorkoutModal(!showWorkoutModal);
            //   completeWorkout.mutate({
            //     id: selectedWorkout.id,
            //     status: "skipped",
            //     title: selectedWorkout.title || "",
            //     userId: userId,
            //   });
              // invalidate query to update the UI
              // utils.example.getUncompletedWorkouts.invalidate();
              // utils.example.getUncompletedWorkouts.invalidate();
            }}
          >
            Skip
          </button>
          <button
            className="my-4 rounded bg-lightpurple p-2 text-white transition-all hover:bg-blue-500"
            onClick={(e) => {
              e.preventDefault();
            //   completeWorkout.mutate({
            //     id: selectedWorkout.id,
            //     status: "completed",
            //     title: selectedWorkout.title || "",
            //     userId: userId,
            //   });

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