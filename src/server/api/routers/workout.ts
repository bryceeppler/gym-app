import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const workoutRouter = createTRPCRouter({
  getAllworkouts: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.workouts.findMany();
  }),
  getCompletedWorkouts: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
        return ctx.prisma.users.findUnique({
            where: {
                id: input.id,
            },
        }).completedWorkouts();
    }),
});
