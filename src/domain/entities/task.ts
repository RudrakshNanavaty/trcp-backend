import { TaskStatus, Priority } from '@prisma/client'

export class Task {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string | null,
    public status: TaskStatus,
    public priority: Priority,
    public startDate: Date | null,
    public dueDate: Date | null,
    public completedAt: Date | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly taskListId: string
  ) {}

  updateStatus(status: TaskStatus): void {
    this.status = status;
    if (status === TaskStatus.COMPLETED) {
      this.completedAt = new Date();
    }
  }

  updateDates(startDate: Date | null, dueDate: Date | null): void {
    if (startDate && dueDate && startDate > dueDate) {
      throw new Error('Start date cannot be after due date');
    }
    this.startDate = startDate;
    this.dueDate = dueDate;
  }

  isOverdue(): boolean {
    if (!this.dueDate) return false;
    return this.dueDate < new Date() && this.status !== TaskStatus.COMPLETED;
  }
}