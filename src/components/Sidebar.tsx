import React from 'react'
import { api } from "../utils/api";
// type Props = {}

// export default function Sidebar({}: Props) {
  export default function Sidebar() {
    const createIcePlunge = api.users.createIcePlunge.useMutation(
      {
        onSuccess: () => {
          // invalidate query to update the UI
          // utils.workouts.getIncompleteWorkouts.invalidate()
          // .catch((err) => console.log(err));  
        },
      }
    );
  return (
    <div className="flex flex-col gap-4">
    <div className="text-white text-lg font-bold">eppler97</div>
    <button className="transition-colors bg-coldblue hover:bg-opacity-60 w-full text-white py-4 font-bold text-sm rounded">
        Cold plunge
    </button>
    <button className="transition-colors bg-coldblue hover:bg-opacity-60 w-full text-white py-4 font-bold text-sm rounded">
        Cardio
    </button>
    </div>

  )
}