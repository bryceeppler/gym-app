import React from "react";

type Props = {};

export default function HistoryGrid({}: Props) {
  const i = 45;
  return (
    <div className="flex flex-col text-white">
      <div className="font-bold text-lg">Bryce</div>
      <div className="text-gray-400">45 points</div>
      <div className="grid h-fit grid-cols-7 gap-1 mt-2">
        {[...Array(i)].map((_, i) => (
          <div key={i} className="h-4 w-4 bg-base" />
        ))}
      </div>
    </div>
  );
}
