import { TaskList } from '../../../domain/entities/taskList';
import { ITaskListRepository } from '../../interfaces/repositories/taskListRepository';

interface CreateTaskListDTO {
  name: string;
  description?: string;
}

export class CreateTaskListUseCase {
  constructor(private taskListRepository: ITaskListRepository) {}

  async execute(dto: CreateTaskListDTO) {
    const taskList = new TaskList(
      crypto.randomUUID(),
      dto.name,
      dto.description || null,
      new Date(),
      new Date()
    );

    return this.taskListRepository.create(taskList);
  }
}