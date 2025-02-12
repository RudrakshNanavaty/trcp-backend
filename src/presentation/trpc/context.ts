import * as trpc from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { RepositoryFactory, DatabaseType } from '../../infrastructure/repositories/repositoryFactory';

// Initialize repositories
RepositoryFactory.setDatabaseType(DatabaseType.IN_MEMORY);

// Since req and res are unused, we can just use underscore to indicate they're intentionally unused
export const createContext = (_opts: CreateExpressContextOptions) => ({
  taskRepository: RepositoryFactory.createTaskRepository(),
  taskListRepository: RepositoryFactory.createTaskListRepository(),
});

// Fix the type inference by providing the type argument
export type Context = trpc.inferAsyncReturnType<typeof createContext>;