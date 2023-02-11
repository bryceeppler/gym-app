import React from "react";

type Props = {
  allUserPoints: {
    userId: number;
    totalPoints: number;
    cardioSessionsPoints: number;
    icePlungesPoints: number;
    completedWorkoutsPoints: number;
    username?: string;
  }[];
};

export default function Leaderboard({ allUserPoints }: Props) {
  const score1 = 18;
  const score2 = 16;
  const score3 = 14;

  // order users by score
  const sortedUsers = allUserPoints.sort(
    (a, b) => b.totalPoints - a.totalPoints
  );

  // get the highest score
  const maxScore = Math.max(...sortedUsers.map((user) => user.totalPoints));

  return (
    <div className="flex w-full flex-col text-left">
      <div className="my-2 text-lg font-bold text-white">Leaderboard</div>
      <div className="flex h-auto flex-col items-center justify-center gap-2 rounded bg-paper p-4">
        {
          // map over the sorted users
          sortedUsers.map((user) => (
            <div key={user.userId} className="flex h-12 w-full flex-row items-center rounded p-2 text-white">
              <img
                src={`https://robohash.org/${user.username || "tempuser"}?set=set2`}
                className="mr-3 h-8 w-8 rounded-full bg-base"
              />
              <div className="flex w-full flex-col">
                <div>{user.username}</div>
                {/* Black background bar */}
                <div className="flex h-2 w-full flex-row items-center rounded bg-black">
                  {/* Green progress bar */}
                  <div
                    className="flex h-2 flex-row items-center rounded bg-green-500"
                    style={{ width: `${(user.totalPoints / maxScore) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
