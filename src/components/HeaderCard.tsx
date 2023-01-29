import React from 'react'

type Props = {
    username?: string
    daysLeft?: number 
}


export default function HeaderCard({ username, daysLeft }: Props) {
  return (
    <div className="col-span-8 flex h-24 flex-col justify-center bg-paper text-white p-4 text-left md:col-span-2 rounded-sm">
    <div className="text-lg font-bold">
      {username}
    </div>
    <div className="text-md font-semibold opacity-70 text-lightpurple">Onslaught</div>
    <div className="text-sm opacity-70 text-gray-300">{daysLeft} days remaining</div>
  </div>
  )
}