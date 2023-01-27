import React from 'react'

type Props = {
    username?: string
}

export default function HeaderCard({ username }: Props) {
  return (
    <div className="col-span-8 flex h-24 flex-col justify-center bg-white p-4 text-left md:col-span-2">
    <div className="text-xl font-bold">
      Welcome back {username}!
    </div>
    <div className="text-md font-bold opacity-50">Onslaught Day 46</div>
  </div>
  )
}