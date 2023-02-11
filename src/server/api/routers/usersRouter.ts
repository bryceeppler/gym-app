import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({
  getUserList: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.users.findMany({
      include: {
        // order completedWorkouts by date asc
        completedWorkouts: true,
        icePlunges: true,
        cardioSessions: true,
      },
    });
  }),

  createIcePlunge: publicProcedure
    // accept a workout id and user id and create a completedWorkout entry with the given status
    // return the completedWorkout entry
    .input(z.object({ uid: z.number(), duration: z.number(), date: z.date() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.icePlunge.create({
          data: {
            userId: input.uid,
            duration: input.duration,
            date: input.date,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }),
    createCardioSession: publicProcedure
    .input(z.object({ uid: z.number(), duration: z.number(), date: z.date() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.cardioSession.create({
          data: {
            userId: input.uid,
            duration: input.duration,
            date: input.date,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }),
    getAllUserPoints: publicProcedure.query(({ ctx }) => {
      return ctx.prisma.users.findMany({
        include: {
          completedWorkouts: true,
          icePlunges: true,
          cardioSessions: true,
        },
      }).then((users) => {
        const calculatedUsers = users.map((user) => {
          const icePlungesPoints = user.icePlunges.length;
          const cardioSessionsPoints = user.cardioSessions.filter((cardioSession) => cardioSession.duration && cardioSession.duration > 15).length;
          const completedWorkoutsPoints = user.completedWorkouts.filter((completedWorkout) => completedWorkout.status === "completed").length;
          const totalPoints = icePlungesPoints + cardioSessionsPoints + completedWorkoutsPoints;
          return {
          username: user.username || "",
          userId: user.id,
          icePlungesPoints,
          cardioSessionsPoints,
          completedWorkoutsPoints,
          totalPoints,
        };
      });
      return calculatedUsers;
    });
  }),
});