import { ITaskListRepository } from '../../application/interfaces/repositories/taskListRepository';
import { TaskList } from '../../domain/entities/taskList';
import { InMemoryStore } from '../database/inMemoryStore';
import { TaskListNotFoundError } from '../../shared/errors/domainErrors';

export class InMemoryTaskListRepository implements ITaskListRepository {
  private store: InMemoryStore;

  constructor() {
    this.store = InMemoryStore.getInstance();
  }

  async findById(id: string) {
    const taskList = this.store.getTaskList(id);
    return taskList ? this.toDomain(taskList) : null;
  }

  async findAll() {
    const taskLists = this.store.getTaskLists();
    return taskLists.map(this.toDomain);
  }

  async create(taskList: TaskList) {
    const persistenceTaskList = this.toPersistence(taskList);
    this.store.setTaskList(persistenceTaskList);
    return taskList;
  }

  async update(taskList: TaskList) {
    const exists = this.store.getTaskList(taskList.id);
    if (!exists) {
      throw new TaskListNotFoundError(taskList.id);
    }

    const persistenceTaskList = this.toPersistence(taskList);
    this.store.setTaskList(persistenceTaskList);
    return taskList;
  }

  async delete(id: string) {
    const exists = this.store.getTaskList(id);
    if (!exists) {
      throw new TaskListNotFoundError(id);
    }

    this.store.deleteTaskList(id);
  }

  private toDomain(taskList: any): TaskList {
    return new TaskList(
      taskList.id,
      taskList.name,
      taskList.description,
      new Date(taskList.createdAt),
      new Date(taskList.updatedAt)
    );
  }

  private toPersistence(taskList: TaskList): any {
    return {
      id: taskList.id,
      name: taskList.name,
      description: taskList.description,
      createdAt: taskList.createdAt,
      updatedAt: taskList.updatedAt
    };
  }
}