import { type NextPage } from "next";
import Head from "next/head";
import { api } from "../utils/api";
import { useEffect, useState } from "react";
import { useWorkoutModalStore } from "../store";
import WorkoutModal from "../components/workoutModal";
import HeaderCard from "../components/HeaderCard";
import WorkoutHistoryModal from "../components/WorkoutHistoryModal";


// define types
interface Workout {
  id: number;
  completedAt: Date | null;
  title: string | null;
  userId: number;
  workoutId: number;
  status: string;
  workout_str: string | null;
}



const Home: NextPage = () => {
  const {
    showWorkoutModal,
    setShowWorkoutModal,
    selectedWorkout,
    setSelectedWorkout,
    showWorkoutHistoryModal,
    setShowWorkoutHistoryModal,
  } = useWorkoutModalStore();
  const [userId, setUserId] = useState(2);

  const {
    data: userData,
  } = api.example.getUser.useQuery({
    id: userId,
  });

  const {
    data: workoutData,
  } = api.example.getUncompletedWorkouts.useQuery({
    id: userId,
  });

  const {
    data: userStats,
  } = api.example.getUserStats.useQuery({
    id: userId,
  });

  const {
    data: users,
  } = api.example.getCompletedWorkouts.useQuery();

  const {
    data: userScores,
  } = api.example.getAllUserScores.useQuery();

  const {
    data: allUsers,
  } = api.example.getAllUsers.useQuery();

  const [userSelected, setUserSelected] = useState(false);

  const {
    data: completedWorkouts,
  } = api.workout.getCompletedWorkouts.useQuery(
    { id: userId },
  );
  
  // check type of completedWorkouts

  const today = new Date();

  return (
    <>
      <Head>
        <title>Onslaught</title>
        <meta name="description" content="A simple workout tracker for the Onslaught program." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen h-full flex-col items-center justify-center bg-gradient-to-b p-4 from-[#121b36] to-[#161621]">
        {showWorkoutModal && <WorkoutModal userId={userId} />}
        {showWorkoutHistoryModal && completedWorkouts && <WorkoutHistoryModal 
        // should be the array of completed workouts where the user id matches the user id of the user selected
        
          completedWorkouts={completedWorkouts}
          
        />}
        {!userSelected && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl text-white font-bold">
              Select a user to view their dashboard
            </h1>
            <div className="flex flex-row space-x-4 mt-4">
              {
                // map over users and display a button for each user
                allUsers?.map((user) => (
                  <button
                    onClick={() => {
                      setUserId(user.id);
                      setUserSelected(true)}
                    
                    }
                    key={user.id}
                    className="bg-blue-500 text-white rounded p-2"
                  >
                    {user.username}
                  </button>
                ))

              }
            </div>
          </div>

        )}
        {userSelected && <div className="grid w-full max-w-5xl grid-cols-8 gap-4">
          {userData?.username && (
            <HeaderCard
              username={userData?.username}
              daysLeft={workoutData?.length}
            />
          )}

          {/* workout cards */}
          <div className="col-span-8 flex h-24 flex-row items-center justify-center space-x-4 md:col-span-6">
            {workoutData?.slice(0, 5).map((workout, i) => (
              <div
                // if workout.workout_str?.split(" ")[0] === "Cold" we want bg color to be blue
                className={`flex h-24 w-full flex-col justify-between rounded ${ workout.title === "Cold plunge" ? "bg-blue-500 p-3 text-white hover:bg-blue-400" : "bg-gray-800 p-3 text-white hover:bg-gray-600" } ${i === 0 ? "border-4 border-blue-500" : ""} ${ 
                  // if size < md, and index = 4, hide 
                  i === 4 ? "hidden md:flex" : "" }`}
                key={i}
                onClick={
                  i === 0
                    ? (e) => {
                        console.log("setting");
                        console.log("workout", workout);
                        console.log("selectedWorkout", selectedWorkout);
                        e.preventDefault();
                        setShowWorkoutModal(!showWorkoutModal);
                        setSelectedWorkout({
                          title: workout.title || "",
                          id: workout.id,
                          workout_str: workout.workout_str || "",
                        });
                      }
                    : (e) => e.preventDefault()
                }
              >
                {/* first line of workout_str */}
                <div>{workout.title}</div>
                <div className="text-right opacity-60">
                  {
                    // i days after today
                    new Date(today.getTime() + (i + 1) * 24 * 60 * 60 * 1000)
                      .toDateString()
                      .split(" ")
                      .slice(1, 3)
                      .join(" ")
                  }
                </div>
              </div>
            ))}
          </div>

          {/* stats cards */}
          <div className="col-span-8 h-auto md:col-span-2">
            <div className="mb-4 flex h-24 w-full items-center rounded-sm bg-gray-800 p-4 text-white hover:bg-gray-700">
              {/* img placeholder */}
              {/* <div className="h-16 w-16 bg-gray-200"></div> */}
              <img
                className="h-16 w-16 object-contain"
                src="https://i.ibb.co/2PTBdkx/vecteezy-ice-cube-clipart-design-illustration-9384604-666.png"
                alt="ice cube"
              />
              <div className="ml-4 flex flex-col">
                <div className="text-3xl font-bold text-white">
                  {userStats?.coldPlunges}
                </div>
                <div className="text-sm">cold plunges</div>
              </div>
            </div>
            <div className="mb-4 flex h-24 w-full items-center rounded-sm bg-gray-800 p-4 text-white hover:bg-gray-700">
              {/* img placeholder */}
              <img
                className="h-16 w-16 object-contain"
                src="https://i.ibb.co/hddnKLZ/Png-Item-2747104.png"
                alt="fire"
              />
              <div className="ml-4 flex flex-col">
                <div className="text-3xl font-bold text-white">
                  {userStats?.workoutsCompleted}
                </div>
                <div className="text-sm">workouts complete</div>
              </div>
            </div>
            <div className="mb-4 flex h-24 w-full items-center rounded-sm bg-gray-800 p-4 text-white hover:bg-gray-700">
              {/* img placeholder */}
              <img
                className="h-16 w-16 object-contain"
                src="https://i.ibb.co/0qjGNcc/Png-Item-38127.png"
                alt="skip"
              />
              <div className="ml-4 flex flex-col">
                <div className="text-3xl font-bold text-white">
                  {userStats?.workoutsSkipped}
                </div>
                <div className="text-sm">skipped</div>
              </div>
            </div>
          </div>

          {/* completed workouts */}
          <div className="col-span-8 mb-4 flex h-auto flex-col space-y-4 bg-gray-800 p-4 text-white md:col-span-6">
            {users?.map((user, i) => (
              <div className="mt-4 h-full w-full justify-center px-4" key={user.id}>
                <div className="flex flex-row items-center space-x-0.5 ">
                  <div className="flex flex-col">
                  <div className="w-20 text-md font-bold">{user.username}</div>
                  <div className="text-sm opacity-60">{userScores?.find(userScore => userScore.username === user.username)?.score} points</div>
                  </div>
                  {/* map out tiles for the last 7 completed workouts */}
                  {/* if there arent enough complete workouts, make the tiles gray */}
                  {
                    // if workout.status = completed color = green
                    // if workout.status = skipped color = red
                    // if workout.status = completed AND workout.title = "Cold plunge" color = blue
                    // map out the LAST 7 workouts
                    user.completedWorkouts.slice(-6).map((workout, i) => (
                      <div
                        //
                        key={i}
                        className={`h-8 w-8 bg-opacity-50 hover:bg-opacity-60 transition-all rounded-sm ${workout.status === "completed" && workout.title === "Cold plunge" ? "bg-blue-500" : workout.status === "completed" ? "bg-green-600" : workout.status === "placeholder" ? "bg-gray-300" : "bg-red-500"}`} 
                      ></div>
                    ))
                  }
                </div>
              </div>
            ))}
            <div className="my-auto"/>
            {/* button to open workout history modal */}
            <button 
              className="w-full bg-gray-700 py-4 text-white rounded-sm hover:bg-gray-600"
              onClick={(e) => {
                e.preventDefault();
                setShowWorkoutHistoryModal(!showWorkoutHistoryModal);
              }}
            >
              View my workout history
            </button>

          </div>
        </div>}
      </main>
    </>
  );
};

export default Home;
