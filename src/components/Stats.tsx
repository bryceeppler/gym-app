import React from "react";

type Props = {
  coldPlunges?: number;
  cardioSessions?: number;
  workouts?: number;
  skipped?: number;
};

export default function Stats({
  coldPlunges,
  cardioSessions,
  workouts,
  skipped,
}: Props) {
  return (
    <div className="flex flex-col text-left">
      <div className="my-2 text-lg font-bold text-white">Stats</div>
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div className="flex w-full flex-row rounded bg-paper p-4 text-white transition-colors hover:bg-base">
          <img src="https://bryces-images.s3.us-west-2.amazonaws.com/workout-app/Vector+1.svg"
            className="w-8 h-auto mr-4"
          />
          <div className="flex flex-col">
            <div className="font-bold ">{coldPlunges || 0}</div>
            <div className="text-sm text-gray-400">cold plunges</div>
          </div>
        </div>
        <div className="flex w-full flex-row rounded bg-paper p-4 text-white transition-colors hover:bg-base">
          <img src="https://bryces-images.s3.us-west-2.amazonaws.com/workout-app/Group+3.svg"
            className="w-8 h-auto mr-4"
          />
          <div className="flex flex-col">
            <div className="font-bold ">{cardioSessions || 0}</div>
            <div className="text-sm text-gray-400">cardio sessions</div>
          </div>
        </div>        <div className="flex w-full flex-row rounded bg-paper p-4 text-white transition-colors hover:bg-base">
          <img src="https://bryces-images.s3.us-west-2.amazonaws.com/workout-app/Group+1+(1).svg"
            className="w-8 h-auto mr-4"
          />
          <div className="flex flex-col">
            <div className="font-bold ">{workouts || 0}</div>
            <div className="text-sm text-gray-400">workouts</div>
          </div>
        </div>        <div className="flex w-full flex-row rounded bg-paper p-4 text-white transition-colors hover:bg-base">
          <img src="https://bryces-images.s3.us-west-2.amazonaws.com/workout-app/Group+2.svg"
            className="w-8 h-auto mr-4"
          />
          <div className="flex flex-col">
            <div className="font-bold ">{skipped || 0}</div>
            <div className="text-sm text-gray-400">skipped</div>
          </div>
        </div>
      </div>
    </div>
  );
}
