import {publicProcedure, router} from './router';
import { taskRouter } from './routers/taskRouter';
import { taskListRouter } from './routers/taskListRouter';

export const appRouter = router({
  task: taskRouter,
  taskList: taskListRouter,
  _debug: publicProcedure.query(({ ctx }): any => {
    // Get all route names from your router
    const routes = Object.keys(appRouter._def.procedures);
    return routes;
  }),
});

export type AppRouter = typeof appRouter;