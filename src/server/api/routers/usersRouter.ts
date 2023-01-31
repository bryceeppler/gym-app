import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({
  getUserList: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.users.findMany({
      include: {
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
});
