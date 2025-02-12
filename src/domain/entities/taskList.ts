export class TaskList {
  constructor(
    public readonly id: string,
    public name: string,
    public description: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  updateName(name: string): void {
    if (!name.trim()) {
      throw new Error('Task list name cannot be empty');
    }
    this.name = name.trim();
  }
}