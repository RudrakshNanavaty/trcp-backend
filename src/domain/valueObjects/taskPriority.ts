import { Priority } from '@prisma/client';

export class TaskPriority {
  private constructor(private readonly value: Priority) {}

  static create(priority: Priority): TaskPriority {
    return new TaskPriority(priority);
  }

  getValue(): Priority {
    return this.value;
  }

  isHighPriority(): boolean {
    return this.value === Priority.HIGH || this.value === Priority.URGENT;
  }

  toString(): string {
    return this.value;
  }
}