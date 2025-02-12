export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainError';
  }
}

export class TaskNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Task with id ${id} not found`);
    this.name = 'TaskNotFoundError';
  }
}

export class TaskListNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Task list with id ${id} not found`);
    this.name = 'TaskListNotFoundError';
  }
}