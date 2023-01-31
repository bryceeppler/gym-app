import React from 'react'
import { api } from "../utils/api";
import { users } from '@prisma/client';
type Props = {
  user?: users;
}
import { useWorkoutModalStore } from '../store';

export default function Sidebar({user}: Props) {
  // export default function Sidebar() {
    const { userId, setShowActivityModal } = useWorkoutModalStore();
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
    <div className="text-white text-lg font-bold">{user?.username}</div>
    <button className="transition-colors bg-coldblue hover:bg-opacity-60 w-full text-white py-4 font-bold text-sm rounded"
    onClick={() => {
      setShowActivityModal(true);
      // createIcePlunge.mutate({
      //   uid: userId,
      //   duration: 5,
      // });
    }}
    >
        Add activity
    </button>

    </div>

  )
}