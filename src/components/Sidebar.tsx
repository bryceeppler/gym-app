import React, { useEffect, useState } from "react";
import { api } from "../utils/api";
import {
  users,
  cardioSession,
  icePlunge,
  completedWorkouts,
} from "@prisma/client";
type Props = {
  user?: users;
  cardioSessions?: cardioSession[];
  icePlunges?: icePlunge[];
  completedWorkouts?: completedWorkouts[];
};
import { useWorkoutModalStore } from "../store";

export default function Sidebar({
  user,
  cardioSessions,
  icePlunges,
  completedWorkouts,
}: Props) {
  // export default function Sidebar() {
  const { setShowActivityModal } = useWorkoutModalStore();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row items-center gap-4">
        {/* img placeholder */}
        <img src="/bigwipes.png" className="h-12 w-12 rounded-full bg-base" />        <div className="text-lg font-bold text-white">{user?.username}</div>
      </div>
      <button
        className="w-28 rounded bg-indigo-500 py-2 text-sm font-bold text-white transition-colors hover:bg-opacity-60"
        onClick={() => {
          setShowActivityModal(true);
        }}
      >
        Add activity
      </button>
      <div className="flex w-full flex-col text-left text-white">
        <div className="mb-4 text-lg font-bold">Recently completed</div>
        {/* map out cardiosessions, ice plunges and recently completed workouts */}
        {completedWorkouts
          ?.slice(-3)
          .reverse()
          .map((workout) => {
            if (workout.status === "skipped") {
              return (
                <div
                  key={workout.id}
                  className="mx-auto mb-1 flex w-60 flex-row justify-between rounded bg-baselight p-2"
                >
                  <div className="text-sm font-bold">{workout.title}</div>
                  <div className="text-sm text-gray-400">missed</div>
                </div>
              );
            }
            return (
              <div
                key={workout.id}
                className="mb-1 flex w-full flex-row justify-between rounded p-2 border-white border-2 border-opacity-10"
              >
                <div className="text-sm font-bold">{workout.title}</div>
                <div className="text-sm font-bold">
                  {/* reformat date as Feb 3, Feb 4 etc */}
                  {workout.date?.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })} 
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
