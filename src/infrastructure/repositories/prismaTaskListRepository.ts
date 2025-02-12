import { PrismaClient } from '@prisma/client';
import { ITaskListRepository } from '../../application/interfaces/repositories/taskListRepository';
import { TaskList } from '../../domain/entities/taskList';
import { TaskListMapper } from '../database/mappers/taskListMapper';
import { TaskListNotFoundError } from '../../shared/errors/domainErrors';

export class PrismaTaskListRepository implements ITaskListRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string) {
    const taskList = await this.prisma.taskList.findUnique({
      where: { id }
    });

    return taskList ? TaskListMapper.toDomain(taskList) : null;
  }

  async findAll() {
    const taskLists = await this.prisma.taskList.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return taskLists.map(TaskListMapper.toDomain);
  }

  async create(taskList: TaskList) {
    const persistenceData = TaskListMapper.toPersistence(taskList);

    const createdTaskList = await this.prisma.taskList.create({
      data: persistenceData,
    });

    return TaskListMapper.toDomain(createdTaskList);
  }

  async update(taskList: TaskList) {
    const persistenceData = TaskListMapper.toPersistence(taskList);

    try {
      const updatedTaskList = await this.prisma.taskList.update({
        where: { id: taskList.id },
        data: persistenceData,
      });

      return TaskListMapper.toDomain(updatedTaskList);
    } catch (error) {
      throw new TaskListNotFoundError(taskList.id);
    }
  }

  async delete(id: string) {
    try {
      await this.prisma.taskList.delete({
        where: { id },
      });
    } catch (error) {
      throw new TaskListNotFoundError(id);
    }
  }
}