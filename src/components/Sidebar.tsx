import React from 'react'
import { api } from "../utils/api";
import { users, cardioSession, icePlunge} from '@prisma/client';
type Props = {
  user?: users;
  cardioSessions?: cardioSession[];
  icePlunges?: icePlunge[];
}
import { useWorkoutModalStore } from '../store';

export default function Sidebar({user, cardioSessions, icePlunges}: Props) {
  // export default function Sidebar() {
    console.log(user)
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
    <div className="flex flex-col space-y-10 md:space-y-0 md:flex-row justify-between px-10 w-full">
      <div className="flex flex-col">
        <div className="text-white text-sm font-bold">Time submerged</div>
        <div className="text-white text-2xl font-bold">{
          // sum all the "duration" fields in icePlunges
          icePlunges?.reduce((acc, curr) => acc + (curr.duration || 0), 0)
          
        }</div>
      </div>
      <div className="flex flex-col">
        <div className="text-white text-sm font-bold">Cardio time</div>
        <div className="text-white text-2xl font-bold">{
          // sum all the "duration" fields in cardioSessions
          cardioSessions?.reduce((acc, curr) => acc + (curr.duration || 0), 0)
        }</div>
      </div>
      </div>
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