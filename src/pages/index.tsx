import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
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
      <main className="flex min-h-screen flex-col items-center justify-center bg-base bg-gradient-to-b p-4">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Select a user</h1>
          <div className="flex flex-row items-center justify-center">
            <button className="m-2 rounded-full bg-white py-2 px-4 font-bold text-black transition-colors hover:bg-gray-200">
              <Link href="/dashboard/1">eppler97</Link>
            </button>
            <button className="m-2 rounded-full bg-white py-2 px-4 font-bold text-black transition-colors hover:bg-gray-200">
              <Link href={`/dashboard/2`}>Padfoot</Link>
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
