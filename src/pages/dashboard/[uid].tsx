import React from "react";
import Head from "next/head";
import Link from "next/link";
import UpcomingWorkouts from "../../components/UpcomingWorkouts";
import Stats from "../../components/Stats";
import Progress from "../../components/Progress";
type Props = {
  uid: number;
};

export default function UserDashboard({ uid }: Props) {
  // fetch all user data with completed workouts

  // fetch all workout data
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
      <main className="flex min-h-screen flex-row justify-center bg-base p-4">
        {/* navbar placeholder */}
        <div className="hidden h-full w-16 flex-col items-center justify-center md:flex">
          <div className="h-12 w-12 rounded bg-paper transition-colors hover:bg-baselight" />
        </div>
        {/* div should have max height and max width with padding 4 */}
        <div className=" min-h-screen w-full rounded bg-baselight p-4">
          <div className="grid grid-cols-12 gap-4">
            {/* main section */}
            <div className="col-span-12 min-h-screen bg-paper md:col-span-8">
              <UpcomingWorkouts />
              <Stats />
              <Progress />
            </div>

            {/* right sidebar */}
            <div className="col-span-12 min-h-screen bg-paper md:col-span-4">
              <div className="font-bold text-white">Right Sidebar</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context: { params: { uid: number } }) {
  return {
    props: {
      uid: context.params.uid,
    }, // will be passed to the page component as props
  };
}
