import React from 'react'
import HistoryGrid from './HistoryGrid'

type Props = {}

export default function Progress({}: Props) {
  return (
    <div className="flex flex-col text-left">
      <div className="my-2 text-lg font-bold text-white">Progress</div>
      <div className="flex flex-col gap-24 md:flex-row w-full h-96 bg-paper p-8">
        <HistoryGrid />
        <HistoryGrid />
      </div>
    </div>  )
}