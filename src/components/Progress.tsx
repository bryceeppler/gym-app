import React from 'react'
import HistoryGrid from './HistoryGrid'
import {workouts, users} from '@prisma/client'

type Props = {
  workouts?: workouts[];
  users?: users[];
}

export default function Progress({workouts, users}: Props) {
  // export default function Progress() {
  return (
    <div className="flex flex-col text-left">
      <div className="my-2 text-lg font-bold text-white">Progress</div>
      <div className="flex flex-col gap-24 lg:flex-row w-full h-96 bg-paper p-8">
        <HistoryGrid />
        <HistoryGrid />
      </div>
    </div>  )
}