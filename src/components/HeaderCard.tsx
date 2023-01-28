import React from 'react'

type Props = {
    username?: string
    daysLeft?: number 
}


export default function HeaderCard({ username, daysLeft }: Props) {
  return (
    <div className="col-span-8 flex h-24 flex-col justify-center bg-gray-800 text-white p-4 text-left md:col-span-2 rounded-sm">
    <div className="text-lg font-bold">
      {username}
    </div>
    <div className="text-md font-bold opacity-50">Onslaught</div>
    <div className="text-sm opacity-70 text-blue-300">{daysLeft} days remaining</div>
  </div>
  )
}