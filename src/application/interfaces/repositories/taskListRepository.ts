import { TaskList } from '../../../domain/entities/taskList';

export interface ITaskListRepository {
  findById(id: string): Promise<any>;
  findAll(): Promise<any>;
  create(taskList: TaskList): Promise<any>;
  update(taskList: TaskList): Promise<any>;
  delete(id: string): Promise<any>;
}