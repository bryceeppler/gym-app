import React from "react";

type Props = {};

export default function Leaderboard({}: Props) {
  const score1 = 18;
  const score2 = 16;
  const score3 = 14;

  const maxScore = Math.max(score1, score2, score3);
  return (
    <div className="flex w-full flex-col text-left">
      <div className="my-2 text-lg font-bold text-white">Leaderboard</div>
      <div className="flex h-auto flex-col items-center justify-center gap-2 bg-paper p-4">
        {/* circle img placeholder */}
        <div className="flex h-12 w-full flex-row items-center rounded p-2 text-white">
          <img src="/bigwipes.png" className="mr-3 h-8 w-8 rounded-full bg-base" />
          <div className="flex flex-col w-full">
            <div>bigwipes</div>
            {/* progress bar */}
            {/* Black background bar */}
            <div className="flex h-2 w-full flex-row items-center rounded bg-black">
              {/* Green progress bar */}
              <div
                className="flex h-2 flex-row items-center rounded bg-green-500"
                style={{ width: `${(score1 / maxScore) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>{" "}
        <div className="flex h-12 w-full flex-row items-center rounded p-2 text-white">
        <img src="/Padfoot.png" className="mr-3 h-8 w-8 rounded-full bg-base" />          <div className="flex flex-col w-full">
            <div>Padfoot</div>
              {/* Black background bar */}
              <div className="flex h-2 w-full flex-row items-center rounded bg-black">
              {/* Green progress bar */}
              <div
                className="flex h-2 flex-row items-center rounded bg-green-500"
                style={{ width: `${(score2 / maxScore) * 100}%` }}
              ></div>
            </div> 
          </div>
        </div>{" "}
        <div className="flex h-12 w-full flex-row items-center rounded p-2 text-white">
        <img src="/DangerJones.png" className="mr-3 h-8 w-8 rounded-full bg-base" />          <div className="flex flex-col w-full">
            <div>DangerJones</div>
               {/* Black background bar */}
               <div className="flex h-2 w-full flex-row items-center rounded bg-black">
              {/* Green progress bar */}
              <div
                className="flex h-2 flex-row items-center rounded bg-green-500"
                style={{ width: `${(score3 / maxScore) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
