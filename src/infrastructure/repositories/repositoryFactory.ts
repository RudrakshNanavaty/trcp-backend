import { ITaskRepository } from '../../application/interfaces/repositories/taskRepository';
import { ITaskListRepository } from '../../application/interfaces/repositories/taskListRepository';
import { PrismaTaskRepository } from './prismaTaskRepository';
import { PrismaTaskListRepository } from './prismaTaskListRepository';
import { InMemoryTaskRepository } from './inMemoryTaskRepository';
import { InMemoryTaskListRepository } from './inMemoryTaskListRepository';
import { prisma } from "../database/prismaClient";

export enum DatabaseType {
  PRISMA = 'prisma',
  IN_MEMORY = 'in_memory'
}

export class RepositoryFactory {
  private static databaseType: DatabaseType = DatabaseType.IN_MEMORY;

  static setDatabaseType(type: DatabaseType) {
    this.databaseType = type;
  }

  static createTaskRepository(): ITaskRepository {
    switch (this.databaseType) {
      case DatabaseType.PRISMA:
        return new PrismaTaskRepository(prisma);
      case DatabaseType.IN_MEMORY:
      default:
        return new InMemoryTaskRepository();
    }
  }

  static createTaskListRepository(): ITaskListRepository {
    switch (this.databaseType) {
      case DatabaseType.PRISMA:
        return new PrismaTaskListRepository(prisma);
      case DatabaseType.IN_MEMORY:
      default:
        return new InMemoryTaskListRepository();
    }
  }
}