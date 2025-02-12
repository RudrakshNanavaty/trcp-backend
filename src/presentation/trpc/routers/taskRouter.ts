import { router, publicProcedure } from '../router';
import { z } from 'zod';
import { Priority, TaskStatus } from '@prisma/client';
import { CreateTaskUseCase } from '../../../application/useCases/task/createTask';

export const taskRouter = router({
  create: publicProcedure
    .input(z.object({
      title: z.string().min(1),
      description: z.string().optional(),
      priority: z.nativeEnum(Priority),
      startDate: z.string().datetime().optional(),
      dueDate: z.string().datetime().optional(),
      taskListId: z.string().uuid(),
    }))
    .mutation(async ({ input, ctx }) => {
      const createTask = new CreateTaskUseCase(ctx.taskRepository);
      const task = await createTask.execute({
        ...input,
        startDate: input.startDate ? new Date(input.startDate) : undefined,
        dueDate: input.dueDate ? new Date(input.dueDate) : undefined,
      });
      return task;
    }),

  getById: publicProcedure
    .input(z.string().uuid())
    .query(async ({ input, ctx }) => {
      const task = await ctx.taskRepository.findById(input);
      if (!task) throw new Error('Task not found');
      return task;
    }),

  getByTaskList: publicProcedure
    .input(z.object({
      taskListId: z.string().uuid(),
      filters: z.object({
        status: z.nativeEnum(TaskStatus).optional(),
        priority: z.nativeEnum(Priority).optional(),
        startDate: z.string().datetime().optional(),
        dueDate: z.string().datetime().optional(),
      }).optional(),
    }))
    .query(async ({ input, ctx }) => {
      const tasks = await ctx.taskRepository.findByTaskList(
        input.taskListId,
        input.filters ? {
          ...input.filters,
          startDate: input.filters.startDate ? new Date(input.filters.startDate) : undefined,
          dueDate: input.filters.dueDate ? new Date(input.filters.dueDate) : undefined,
        } : undefined
      );
      return tasks;
    }),

  update: publicProcedure
    .input(z.object({
      id: z.string().uuid(),
      title: z.string().min(1).optional(),
      description: z.string().optional(),
      status: z.nativeEnum(TaskStatus).optional(),
      priority: z.nativeEnum(Priority).optional(),
      startDate: z.string().datetime().optional(),
      dueDate: z.string().datetime().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const task = await ctx.taskRepository.findById(input.id);
      if (!task) throw new Error('Task not found');

      if (input.title) task.title = input.title;
      if (input.description !== undefined) task.description = input.description;
      if (input.status) task.updateStatus(input.status);
      if (input.priority) task.priority = input.priority;
      if (input.startDate || input.dueDate) {
        task.updateDates(
          input.startDate ? new Date(input.startDate) : task.startDate,
          input.dueDate ? new Date(input.dueDate) : task.dueDate
        );
      }

      const updatedTask = await ctx.taskRepository.update(task);
      return updatedTask;
    }),

  delete: publicProcedure
    .input(z.string().uuid())
    .mutation(async ({ input, ctx }) => {
      await ctx.taskRepository.delete(input);
    }),
});