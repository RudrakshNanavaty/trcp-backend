import { router, publicProcedure } from '../router';
import { z } from 'zod';
import { CreateTaskListUseCase } from '../../../application/useCases/taskList/createTaskList';

export const taskListRouter = router({
  create: publicProcedure
    .input(z.object({
      name: z.string().min(1),
      description: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const createTaskList = new CreateTaskListUseCase(ctx.taskListRepository);
      const taskList = await createTaskList.execute(input);
      return taskList;
    }),

  getAll: publicProcedure
    .query(async ({ ctx }) => {
      const taskLists = await ctx.taskListRepository.findAll();
      return taskLists;
    }),

  getById: publicProcedure
    .input(z.string().uuid())
    .query(async ({ input, ctx }) => {
      const taskList = await ctx.taskListRepository.findById(input);
      if (!taskList) throw new Error('Task list not found');
      return taskList;
    }),

  update: publicProcedure
    .input(z.object({
      id: z.string().uuid(),
      name: z.string().min(1).optional(),
      description: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const taskList = await ctx.taskListRepository.findById(input.id);
      if (!taskList) throw new Error('Task list not found');

      if (input.name) taskList.updateName(input.name);
      if (input.description !== undefined) taskList.description = input.description;

      const updatedTaskList = await ctx.taskListRepository.update(taskList);
      return updatedTaskList;
    }),

  delete: publicProcedure
    .input(z.string().uuid())
    .mutation(async ({ input, ctx }) => {
      await ctx.taskListRepository.delete(input);
    }),
});