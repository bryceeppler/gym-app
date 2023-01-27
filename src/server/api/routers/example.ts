import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
    getUser: publicProcedure
    // id is an integer
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.users.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
    getUncompletedWorkouts: publicProcedure
    // return all workouts where the is not a completedWorkout entry for the user
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.workouts.findMany({
        where: {
          completedWorkouts: {
            every: {
              userId: {
                not: input.id,
              },
            },
          },
        },
      });

    }
  ),
  //   .mutation(async ({ ctx, input }) => {
  //     try {
  //       await ctx.prisma.workouts.findMany({
  //         where: {
  //           completedWorkouts: {
  //             every: {
  //               userId: {
  //                 not: input.id,
  //               },
  //             },
  //           },
  //         },
  //       });
  //     }
  //     catch (err) {
  //       console.log(err);
  //     }

  //   }
  // ),

  getUserStats: publicProcedure
    // return {coldPlunges: 0, workoutsCompleted: 0, workoutsSkipped: 0}
    // coldPlunges is the number of completedWorkouts for this user with the title "Cold plunge"
    // workoutsCompleted is the number of completedWorkouts for this user where the status ==   "completed"
    // workoutsSkipped is the number of completedWorkouts for this user where the status == "skipped"
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.users.findUnique({
        where: {
          id: input.id,
        },
        // get completedWorkouts for the user
        include: {
          completedWorkouts: true,
        },
      }).then((user) => {
        // count the number of completedWorkouts with the title "Cold plunge"
        const coldPlunges = user?.completedWorkouts.filter((workout) => {
          // check title = "Cold plunge" and status = "completed"
          return workout.title === "Cold plunge" && workout.status === "completed";
        }).length;
        // count the number of completedWorkouts with the status "completed"
        const workoutsCompleted = user?.completedWorkouts.filter((workout) => {
          return workout.status === "completed" && workout.title !== "Cold plunge";
        }).length;
        // count the number of completedWorkouts with the status "skipped"
        const workoutsSkipped = user?.completedWorkouts.filter((workout) => {
          return workout.status === "skipped";
        }).length;

        return {
          coldPlunges,
          workoutsCompleted,
          workoutsSkipped,
        };
      });
    }
  ),
  completeWorkout: publicProcedure
    // accept a workout id and user id and create a completedWorkout entry with the given status
    // return the completedWorkout entry
    .input(z.object({ id: z.number(), userId: z.number(), status: z.string(), title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.completedWorkouts.create({
          data: {
            workoutId: input.id,
            userId: input.userId,
            status: input.status,
            title: input.title,
          },
        });
      }
      catch (err) {
        console.log(err);
      }

    }
  ),
  getCompletedWorkouts: publicProcedure
  // return the most recent 7 completedWorkouts for each user
  .query(({ ctx }) => {
    return ctx.prisma.users.findMany({
      take: 7,
      // sort completedWorkouts by completedAt
      include: {
        completedWorkouts: true,
      },

    });
  }
),
getAllUserScores: publicProcedure
  // get the completedWorkouts for each user, and create a score
  // completedWorkouts with the status "completed" are worth 2 points
  // completedWorkouts with the status "skipped" are worth -1 point
  // completedWorkouts with the title "Cold plunge" are worth 1 point additional point if their status is "completed"
  .query(({ ctx }) => {
    return ctx.prisma.users.findMany({
      include: {
        completedWorkouts: true,
      },
    }).then((users) => {
      // create a score for each user
      const scores = users.map((user) => {
        // create a score for each completedWorkout
        const score = user.completedWorkouts.reduce((acc, workout) => {
          if (workout.status === "completed") {
            if (workout.title === "Cold plunge") {
              return acc + 3;
            }
            return acc + 2;
          }
          if (workout.status === "skipped") {
            return acc - 1;
          }
          return acc;
        }, 0);
        return {
          username: user.username,
          userId: user.id,
          score,
        };
      });
      return scores;
    });
  }
),
getAllUsers: publicProcedure
  // return all users
  .query(({ ctx }) => {
    return ctx.prisma.users.findMany();
  }
),
});
