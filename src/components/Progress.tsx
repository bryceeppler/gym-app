import React from 'react'
import HistoryGrid from './HistoryGrid'
import {workouts, users, completedWorkouts, icePlunge, cardioSession} from '@prisma/client'

type Props = {
  workouts?: workouts[];
  users?: users[];
  completedWorkouts1?: completedWorkouts[];
  completedWorkouts2?: completedWorkouts[];
  completedWorkouts3?: completedWorkouts[];
  icePlunges1?: icePlunge[];
  icePlunges2?: icePlunge[];
  icePlunges3?: icePlunge[];
  cardioSessions1?: cardioSession[];
  cardioSessions2?: cardioSession[];
  cardioSessions3?: cardioSession[];
}

export default function Progress({workouts, users, completedWorkouts1, completedWorkouts2, completedWorkouts3, icePlunges1, icePlunges2, icePlunges3, cardioSessions1, cardioSessions2, cardioSessions3}: Props) {
  // export default function Progress() {
  return (
    <div className="flex flex-col text-left">
      <div className="my-2 text-lg font-bold text-white">Progress</div>
      <div className="grid grid-cols-3 p-8 gap-8 w-full h-auto bg-paper justify-center">
<div className="col-span-3 lg:col-span-1">
        <HistoryGrid completedWorkouts={completedWorkouts1} workouts={workouts} user={users?.find((user) => user.id === 1)}
          cardioSessions={cardioSessions1} icePlunges={icePlunges1}
        /></div>
<div className="col-span-3 lg:col-span-1">
        <HistoryGrid completedWorkouts={completedWorkouts2} workouts={workouts} user={users?.find((user) => user.id === 2)}
          cardioSessions={cardioSessions2} icePlunges={icePlunges2}
        /></div>
        <div className="col-span-3 lg:col-span-1">
        <HistoryGrid completedWorkouts={completedWorkouts3} workouts={workouts} user={users?.find((user) => user.id === 3)}
          cardioSessions={cardioSessions3} icePlunges={icePlunges3}
        /></div>
      </div>
    </div>  )
}