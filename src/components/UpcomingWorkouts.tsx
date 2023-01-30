import React from "react";

type Props = {};

export default function UpcomingWorkouts({}: Props) {
  return (
    <div className="flex flex-col text-left">
      <div className="my-2 text-lg font-bold text-white">Upcoming</div>
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <div className="flex w-full flex-col rounded bg-paper p-4 text-white transition-colors hover:bg-base">
          <div className="font-bold ">Back</div>
          <div className="text-sm text-gray-400">Date</div>
        </div>
        <div className="flex w-full flex-col rounded bg-paper p-4 text-white transition-colors hover:bg-base">
          <div className="font-bold ">Chest</div>
          <div className="text-sm text-gray-400">Date</div>
        </div>
        <div className="flex w-full flex-col rounded bg-paper p-4 text-white transition-colors hover:bg-base">
          <div className="font-bold ">Legs</div>
          <div className="text-sm text-gray-400">Date</div>
        </div>
        <div className="flex w-full flex-col rounded bg-paper p-4 text-white transition-colors hover:bg-base">
          <div className="font-bold ">Cold plunge</div>
          <div className="text-sm text-gray-400">Date</div>
        </div>
      </div>
    </div>
  );
}
