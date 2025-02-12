import { PrismaClient } from '@prisma/client';
import { ITaskRepository, TaskFilters } from '../../application/interfaces/repositories/taskRepository';
import { Task } from '../../domain/entities/task';
import { TaskMapper } from '../database/mappers/taskMapper';
import { TaskNotFoundError } from '../../shared/errors/domainErrors';

export class PrismaTaskRepository implements ITaskRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id }
    });

    return task ? TaskMapper.toDomain(task) : null;
  }

  async findByTaskList(taskListId: string, filters?: TaskFilters) {
    const tasks = await this.prisma.task.findMany({
      where: {
        taskListId,
        ...(filters?.status && { status: filters.status }),
        ...(filters?.priority && { priority: filters.priority }),
        ...(filters?.startDate && { startDate: { gte: filters.startDate } }),
        ...(filters?.dueDate && { dueDate: { lte: filters.dueDate } }),
      },
      orderBy: [
        { priority: 'desc' },
        { dueDate: 'asc' },
      ],
    });

    return tasks.map(TaskMapper.toDomain);
  }

  async create(task: Task) {
    const persistenceData = TaskMapper.toPersistence(task);

    const createdTask = await this.prisma.task.create({
      data: persistenceData,
    });

    return TaskMapper.toDomain(createdTask);
  }

  async update(task: Task) {
    const persistenceData = TaskMapper.toPersistence(task);

    try {
      const updatedTask = await this.prisma.task.update({
        where: { id: task.id },
        data: persistenceData,
      });

      return TaskMapper.toDomain(updatedTask);
    } catch (error) {
      throw new TaskNotFoundError(task.id);
    }
  }

  async delete(id: string) {
    try {
      await this.prisma.task.delete({
        where: { id },
      });
    } catch (error) {
      throw new TaskNotFoundError(id);
    }
  }
}