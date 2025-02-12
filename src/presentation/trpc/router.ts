import { initTRPC } from '@trpc/server';
import { Context } from './context';

// Add the Context type here
const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;