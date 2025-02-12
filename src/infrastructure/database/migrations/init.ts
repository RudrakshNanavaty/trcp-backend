import { prisma } from '../prismaClient';

async function main() {
  console.log('Starting database initialization...');

  // Create a default task list
  const defaultList = await prisma.taskList.create({
    data: {
      name: 'Default List',
      description: 'Default task list created during initialization',
    },
  });

  console.log('Created default task list:', defaultList);

  // Create a sample task
  const sampleTask = await prisma.task.create({
    data: {
      title: 'Welcome to TODO App',
      description: 'This is a sample task to get you started',
      status: 'TODO',
      priority: 'MEDIUM',
      taskListId: defaultList.id,
    },
  });

  console.log('Created sample task:', sampleTask);
  console.log('Database initialization completed successfully.');
}

main()
  .catch((e) => {
    console.error('Error during database initialization:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });