import { Task } from '../../../domain/entities/task';
import { ITaskRepository } from '../../interfaces/repositories/taskRepository';
import { TaskStatus, Priority } from '@prisma/client';

interface CreateTaskDTO {
  title: string;
  description?: string;
  priority: Priority;
  startDate?: Date;
  dueDate?: Date;
  taskListId: string;
}

export class CreateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(dto: CreateTaskDTO) {
    const task = new Task(
      crypto.randomUUID(),
      dto.title,
      dto.description || null,
      TaskStatus.TODO,
      dto.priority,
      dto.startDate || null,
      dto.dueDate || null,
      null,
      new Date(),
      new Date(),
      dto.taskListId
    );

    return this.taskRepository.create(task);
  }
}