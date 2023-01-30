import Head from "next/head";
import UpcomingWorkouts from "../../components/UpcomingWorkouts";
import Stats from "../../components/Stats";
import Progress from "../../components/Progress";
import Sidebar from "../../components/Sidebar";
import { api } from "../../utils/api";

type Props = {
  uid: number;
};

export default function UserDashboard({ uid }: Props) {

    // fetch all user data with completed workouts
    const { data:userList} = api.users.getUserList.useQuery();

    const { data:workoutList } = api.workouts.getWorkoutList.useQuery();

    const { data:incompleteWorkouts, isLoading } = api.workouts.getIncompleteWorkouts.useQuery({id:uid})

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
      <main className="flex min-h-screen flex-row justify-center bg-base p-4 gap-4">
        {/* navbar placeholder */}
        <div className="hidden h-full w-16 flex-col items-center justify-center lg:flex">
          {/* <img src="/favicon.ico" className="h-12 w-12 rounded bg-paper" /> */}
          <div className="h-12 w-12 rounded bg-paper transition-colors hover:bg-baselight flex justify-center items-center">
            <img src="/favicon.ico" className="h-5 w-5" />
          </div>
        </div>
        {/* div should have max height and max width with padding 4 */}
        <div className=" min-h-screen w-full rounded bg-baselight p-6">
          <div className="grid grid-cols-12 gap-4">
            {/* main section */}
            <div className="col-span-12 min-h-screen lg:col-span-8 space-y-8">
              <UpcomingWorkouts 
                workouts={incompleteWorkouts}
              />
              <Stats 
                coldPlunges={4}
                cardioSessions={2}
                workouts={5}
                skipped={2}
              />
              <Progress />
            </div>

            {/* right sidebar */}
            <div className="col-span-12 min-h-screen bg-paper lg:col-span-4 p-8">
              <Sidebar />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context: { params: { uid: number } }) { 
    // uid is coming as a string, need to convert to number
    const uid = Number(context.params.uid);
  return {
    props: {
      uid: uid,
    }, // will be passed to the page component as props
  };
}
