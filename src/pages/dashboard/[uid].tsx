import Head from "next/head";
import UpcomingWorkouts from "../../components/UpcomingWorkouts";
import Stats from "../../components/Stats";
import Progress from "../../components/Progress";
import Sidebar from "../../components/Sidebar";
import ActivityModal from "../../components/ActivityModal";
import { useWorkoutModalStore } from "../../store";
import { api } from "../../utils/api";
import WorkoutModal from "../../components/WorkoutModal";
import { useEffect } from "react";
import Leaderboard from "../../components/Leaderboard";

type Props = {
  uid: number;
};

export default function UserDashboard({ uid }: Props) {
  const { showWorkoutModal, setUserId, showActivityModal, setCurrentUser } =
    useWorkoutModalStore();
  // fetch all user data with completed workouts
  const { data: userList } = api.users.getUserList.useQuery();

  const { data: workoutList } = api.workouts.getWorkoutList.useQuery();

  const { data: incompleteWorkouts, isLoading } =
    api.workouts.getIncompleteWorkouts.useQuery({ id: uid });

  useEffect(() => {
    // userList && userList.find((user) => user.id === uid) ? () => {
    //   setUserId(uid) && setCurrentUser(userList.find((user) => user.id === uid));
    // } : () => {
    //   console.log("ppo"")
    if (userList) {
      if (userList.find((user) => user.id === uid)) {
        setUserId(uid);
        // setCurrentUser(userList.find((user) => user.id === uid));
      }
    }
  }, [userList]);

  return (
    <>
      <Head>
        <title>Onslaught</title>
        <meta
          name="description"
          content="A simple workout tracker for the Onslaught program."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-row justify-center gap-4 bg-base p-4">
        {showWorkoutModal && <WorkoutModal />}
        {showActivityModal && <ActivityModal />}
        {/* navbar placeholder */}
        <div className="hidden h-full w-16 flex-col items-center justify-center lg:flex">
          {/* <img src="/favicon.ico" className="h-12 w-12 rounded bg-paper" /> */}
          <div className="flex h-12 w-12 items-center justify-center rounded bg-paper transition-colors hover:bg-baselight">
            <img src="/favicon.ico" className="h-4 w-4" />
          </div>
        </div>
        {/* div should have max height and max width with padding 4 */}
        <div className=" min-h-screen w-full rounded bg-baselight p-6">
          <div className="grid grid-cols-12 gap-4">
            {/* main section */}
            <div className="col-span-12 min-h-screen space-y-8 xl:col-span-8">
              <UpcomingWorkouts workouts={incompleteWorkouts} />
              <Stats
                icePlunges={
                  userList?.find((user) => user.id === uid)?.icePlunges.length
                }
                cardioSessions={
                  userList?.find((user) => user.id === uid)?.cardioSessions
                    .length
                }
                workouts={
                  // completed workouts with status "completed"
                  userList
                    ?.find((user) => user.id === uid)
                    ?.completedWorkouts.filter(
                      (workout) => workout.status === "completed"
                    ).length
                }
                skipped={
                  userList
                    ?.find((user) => user.id === uid)
                    ?.completedWorkouts.filter(
                      (workout) => workout.status === "skipped"
                    ).length
                }
              />
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 xl:col-span-8">
                  <Progress
                    workouts={workoutList}
                    users={userList}
                    completedWorkouts1={
                      userList?.find((user) => user.id === 1)?.completedWorkouts
                    }
                    completedWorkouts2={
                      userList?.find((user) => user.id === 2)?.completedWorkouts
                    }
                    completedWorkouts3={
                      userList?.find((user) => user.id === 3)?.completedWorkouts
                    }
                    icePlunges1={
                      userList?.find((user) => user.id === 1)?.icePlunges
                    }
                    icePlunges2={
                      userList?.find((user) => user.id === 2)?.icePlunges
                    }
                    icePlunges3={
                      userList?.find((user) => user.id === 3)?.icePlunges
                    }
                    cardioSessions1={
                      userList?.find((user) => user.id === 1)?.cardioSessions
                    }
                    cardioSessions2={
                      userList?.find((user) => user.id === 2)?.cardioSessions
                    }
                    cardioSessions3={
                      userList?.find((user) => user.id === 3)?.cardioSessions
                    }
                  />
                </div>
                <div className="col-span-12 lg:col-span-4">
                  <Leaderboard />
                </div>
              </div>
            </div>

            {/* right sidebar */}
            <div className="col-span-12 bg-paper p-8 lg:col-span-4 lg:min-h-screen">
              <Sidebar
                user={userList?.find((user) => user.id === uid)}
                cardioSessions={
                  userList?.find((user) => user.id === uid)?.cardioSessions
                }
                icePlunges={
                  userList?.find((user) => user.id === uid)?.icePlunges
                }
                completedWorkouts={
                  userList?.find((user) => user.id === uid)?.completedWorkouts
                }
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export function getServerSideProps(context: { params: { uid: number } }) {
  // uid is coming as a string, need to convert to number
  const uid = Number(context.params.uid);
  return {
    props: {
      uid: uid,
    }, // will be passed to the page component as props
  };
}
