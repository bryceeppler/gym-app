// zustand store
import { useEffect, useState } from "react";
import { useWorkoutModalStore } from "../store";
import { api } from "../utils/api";

// type Props = {
//     userId: number;
// };

export default function ActivityModal() {
  const utils = api.useContext();
  const { showActivityModal, setShowActivityModal, userId } = useWorkoutModalStore();
  const today = new Date();
  const [activity, setActivity] = useState("coldplunge");
  const [date, setDate] = useState("today");
  const [duration, setDuration] = useState(0);
  const createCardioSession = api.users.createCardioSession.useMutation({
    onSuccess: () => {
      // invalidate query to update the UI
      utils.users.getUserList.invalidate()
      .catch((err) => console.log(err));

    },
  });
  const createIcePlunge = api.users.createIcePlunge.useMutation({
    onSuccess: () => {
      // invalidate query to update the UI
      utils.users.getUserList.invalidate()
      .catch((err) => console.log(err));
    },
  });


  return (
    <div
      className="fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-70"
      onClick={(e) => {
        e.preventDefault();
        setShowActivityModal(!showActivityModal);
      }}
    >
      <div
        className="z-30 mx-4 flex h-fit w-full max-w-md flex-col items-center justify-center space-y-5 rounded bg-base py-5 px-2 text-white"
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
              setShowActivityModal(!showActivityModal);
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
        <div className="text-lg font-bold">Select an activity</div>
        <div className="flex flex-row gap-4">
          <div
            className={`rounded bg-paper p-4 transition-colors hover:bg-indigo-400 ${
              activity === "coldplunge" ? "bg-indigo-500" : ""
            }`}
            onClick={() => {
              setActivity("coldplunge");
            }}
          >
            Cold plunge
          </div>
          <div
            className={`rounded bg-paper p-4 transition-colors hover:bg-indigo-400 ${
              activity === "cardio" ? "bg-indigo-500" : ""
            }`}
            onClick={() => {
              setActivity("cardio");
            }}
          >
            Cardio
          </div>
        </div>
        <div className="text-lg font-bold">Date</div>
        <div className="flex flex-row gap-4">
          <div
            className={`rounded bg-paper p-4 transition-colors hover:bg-indigo-400 ${
              date === "yesterday" ? "bg-indigo-500" : ""
            }`}
            onClick={() => {
              setDate("yesterday");
            }}
          >
            Yesterday
          </div>{" "}
          <div
            className={`rounded bg-paper p-4 transition-colors hover:bg-indigo-400 ${
              date === "today" ? "bg-indigo-500" : ""
            }`}
            onClick={() => {
              setDate("today");
            }}
          >
            Today
          </div>
        </div>
        <div className="text-lg font-bold">Duration</div>
        <input
          className="m-4 rounded bg-paper p-2"
          type="number"
          placeholder="Duration in minutes"
          value={duration}
          onChange={(e) => {
            setDuration(parseInt(e.target.value));
          }}
        />
        <button
          className=" rounded bg-paper p-2 px-4 text-sm font-bold transition-colors hover:bg-indigo-500"
          onClick={() => {
            if (activity === "coldplunge") {
              createIcePlunge.mutate({
                uid: userId,
                duration: duration,
                date: date === "today" ? today : new Date(today.setDate(today.getDate() - 1)),
              });

            } else if (activity === "cardio") {
              createCardioSession.mutate({
                uid: userId,
                duration: duration,
                date: date === "today" ? today : new Date(today.setDate(today.getDate() - 1)),
              }); 
            }
            setShowActivityModal(!showActivityModal);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
