import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getAllUsers: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.users.findMany();
  }),
});
