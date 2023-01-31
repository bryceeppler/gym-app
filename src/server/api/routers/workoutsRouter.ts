import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const workoutsRouter = createTRPCRouter({
  getWorkoutList: publicProcedure
    .query(({ ctx }) => {
        return ctx.prisma.workouts.findMany();
    }),

    getIncompleteWorkouts: publicProcedure
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
    }),

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


});