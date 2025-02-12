import { Task } from '../../../domain/entities/task';
import { TaskStatus, Priority } from '@prisma/client';

export interface TaskFilters {
  status?: TaskStatus;
  priority?: Priority;
  startDate?: Date;
  dueDate?: Date;
}

export interface ITaskRepository {
  findById(id: string): Promise<any>;
  findByTaskList(taskListId: string, filters?: TaskFilters): Promise<any>;
  create(task: Task): Promise<any>;
  update(task: Task): Promise<any>;
  delete(id: string): Promise<any>;
}