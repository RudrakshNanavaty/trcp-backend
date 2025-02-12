import { Task, TaskList } from '@prisma/client';

export class InMemoryStore {
  private static instance: InMemoryStore;
  private tasks: Map<any, any> = new Map();
  private taskLists: Map<any, any> = new Map();

  private constructor() {}

  public static getInstance(): InMemoryStore {
    if (!InMemoryStore.instance) {
      InMemoryStore.instance = new InMemoryStore();
    }
    return InMemoryStore.instance;
  }

  // Task Methods
  getTasks(): Task[] {
    return Array.from(this.tasks.values());
  }

  getTask(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  setTask(task: Task): void {
    this.tasks.set(task.id, task);
  }

  deleteTask(id: string): void {
    this.tasks.delete(id);
  }

  // TaskList Methods
  getTaskLists(): TaskList[] {
    return Array.from(this.taskLists.values());
  }

  getTaskList(id: string): TaskList | undefined {
    return this.taskLists.get(id);
  }

  setTaskList(taskList: TaskList): void {
    this.taskLists.set(taskList.id, taskList);
  }

  deleteTaskList(id: string): void {
    this.taskLists.delete(id);
    // Delete all tasks in this list
    const tasksToDelete = Array.from(this.tasks.values())
      .filter(task => task.taskListId === id)
      .map(task => task.id);

    tasksToDelete.forEach(taskId => this.tasks.delete(taskId));
  }
}