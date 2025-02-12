import { Task as PrismaTask } from '@prisma/client';
import { Task } from '../../../domain/entities/task';

export class TaskMapper {
  static toDomain(prismaTask: PrismaTask): Task {
    return new Task(
      prismaTask.id,
      prismaTask.title,
      prismaTask.description,
      prismaTask.status,
      prismaTask.priority,
      prismaTask.startDate,
      prismaTask.dueDate,
      prismaTask.completedAt,
      prismaTask.createdAt,
      prismaTask.updatedAt,
      prismaTask.taskListId
    );
  }

  static toPersistence(task: Task) {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      dueDate: task.dueDate,
      completedAt: task.completedAt,
      taskListId: task.taskListId,
    };
  }
}