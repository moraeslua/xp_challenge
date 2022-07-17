import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const cleanUpDatabase = async () => {
  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  for (const { tablename } of tablenames) {
    if (tablename !== '_prisma_migrations') {
      try {
        await prisma.$executeRawUnsafe(
          `TRUNCATE TABLE "public"."${tablename}" RESTART IDENTITY CASCADE;`,
        );
      } catch (error) {
        console.log({ error });
      }
    }
  }
};

cleanUpDatabase()
  .catch((e) => {
    console.log('Failed to clean up database', e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Successfully cleaned up database');
    await prisma.$disconnect();
  });
