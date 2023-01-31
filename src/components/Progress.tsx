import React from 'react'
import HistoryGrid from './HistoryGrid'
import {workouts, users, completedWorkouts, icePlunge, cardioSession} from '@prisma/client'

type Props = {
  workouts?: workouts[];
  users?: users[];
  completedWorkouts1?: completedWorkouts[];
  completedWorkouts2?: completedWorkouts[];
  icePlunges1?: icePlunge[];
  icePlunges2?: icePlunge[];
  cardioSessions1?: cardioSession[];
  cardioSessions2?: cardioSession[];
}

export default function Progress({workouts, users, completedWorkouts1, completedWorkouts2, icePlunges1, icePlunges2, cardioSessions1, cardioSessions2}: Props) {
  // export default function Progress() {
    console.log(users)
  return (
    <div className="flex flex-col text-left">
      <div className="my-2 text-lg font-bold text-white">Progress</div>
      <div className="flex flex-col gap-24 lg:flex-row w-full h-96 bg-paper p-8">
        <HistoryGrid completedWorkouts={completedWorkouts1} workouts={workouts} user={users?.find((user) => user.id === 1)}
          cardioSessions={cardioSessions1} icePlunges={icePlunges1}
        />
        <HistoryGrid completedWorkouts={completedWorkouts2} workouts={workouts} user={users?.find((user) => user.id === 2)}
          cardioSessions={cardioSessions2} icePlunges={icePlunges2}
        />
      </div>
    </div>  )
}