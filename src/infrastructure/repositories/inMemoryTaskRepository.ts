import { TaskStatus, Priority } from '@prisma/client';
import { ITaskRepository, TaskFilters } from '../../application/interfaces/repositories/taskRepository';
import { Task } from '../../domain/entities/task';
import { InMemoryStore } from '../database/inMemoryStore';
import { TaskNotFoundError } from '../../shared/errors/domainErrors';

export class InMemoryTaskRepository implements ITaskRepository {
  private store: InMemoryStore;

  constructor() {
    this.store = InMemoryStore.getInstance();
  }

  async findById(id: string) {
    const task = this.store.getTask(id);
    return task ? this.toDomain(task) : null;
  }

  async findByTaskList(taskListId: string, filters?: TaskFilters) {
    let tasks = this.store.getTasks()
      .filter((task: any) => task.taskListId === taskListId);

    if (filters) {
      tasks = tasks.filter((task: any) => {
        let matches = true;
        if (filters.status && task.status !== filters.status) matches = false;
        if (filters.priority && task.priority !== filters.priority) matches = false;
        if (filters.startDate && task.startDate && new Date(task.startDate) < new Date(filters.startDate)) matches = false;
        if (filters.dueDate && task.dueDate && new Date(task.dueDate) > new Date(filters.dueDate)) matches = false;
        return matches;
      });
    }

    return tasks.map(this.toDomain);
  }

  async create(task: Task) {
    const persistenceTask = this.toPersistence(task);
    this.store.setTask(persistenceTask);
    return task;
  }

  async update(task: Task) {
    const exists = this.store.getTask(task.id);
    if (!exists) {
      throw new TaskNotFoundError(task.id);
    }

    const persistenceTask = this.toPersistence(task);
    this.store.setTask(persistenceTask);
    return task;
  }

  async delete(id: string) {
    const exists = this.store.getTask(id);
    if (!exists) {
      throw new TaskNotFoundError(id);
    }

    this.store.deleteTask(id);
  }

  private toDomain(task: any): Task {
    return new Task(
      task.id,
      task.title,
      task.description,
      task.status as TaskStatus,
      task.priority as Priority,
      task.startDate ? new Date(task.startDate) : null,
      task.dueDate ? new Date(task.dueDate) : null,
      task.completedAt ? new Date(task.completedAt) : null,
      new Date(task.createdAt),
      new Date(task.updatedAt),
      task.taskListId
    );
  }

  private toPersistence(task: Task): any {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      dueDate: task.dueDate,
      completedAt: task.completedAt,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      taskListId: task.taskListId
    };
  }
}