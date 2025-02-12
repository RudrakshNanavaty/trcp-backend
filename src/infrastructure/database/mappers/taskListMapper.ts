import { TaskList as PrismaTaskList } from '@prisma/client';
import { TaskList } from '../../../domain/entities/taskList';

export class TaskListMapper {
  static toDomain(prismaTaskList: PrismaTaskList): TaskList {
    return new TaskList(
      prismaTaskList.id,
      prismaTaskList.name,
      prismaTaskList.description,
      prismaTaskList.createdAt,
      prismaTaskList.updatedAt
    );
  }

  static toPersistence(taskList: TaskList) {
    return {
      id: taskList.id,
      name: taskList.name,
      description: taskList.description,
    };
  }
}