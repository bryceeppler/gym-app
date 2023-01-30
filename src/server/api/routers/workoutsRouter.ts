import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const workoutsRouter = createTRPCRouter({
  getWorkoutList: publicProcedure
    .query(({ ctx }) => {
        return ctx.prisma.workouts.findMany();
    }),

});