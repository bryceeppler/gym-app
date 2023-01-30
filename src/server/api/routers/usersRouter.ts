import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({
  getUserList: publicProcedure
    .query(({ ctx }) => {
        return ctx.prisma.users.findMany(
            {
                include: {
                    completedWorkouts: true
                }
            }
        )
        }
    ),

});
