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
                NOT: {
                    completedWorkouts: {
                        some: {
                            userId: input.id
                        }
                    }
                }
            
            }
        });
    }),

});