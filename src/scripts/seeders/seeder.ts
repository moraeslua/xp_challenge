import { PrismaClient } from '@prisma/client';
import { SeedAccountEvents } from './account-events.seeders';
import { SeedAccount } from './account.seeders';
import { SeedAsset } from './asset.seeders';
import { SeedInvestmentEvents } from './investment-events.seeders';
import { SeedInvestment } from './investment.seeders';

const prisma = new PrismaClient();

const seedAccount = new SeedAccount(prisma);
const seedAsset = new SeedAsset(prisma);
const seedInvestment = new SeedInvestment(prisma);
const seedAccountEvents = new SeedAccountEvents(prisma);
const seedInvestmentEvents = new SeedInvestmentEvents(prisma);

const seeder = async () => {
  await seedAccount.execute();
  await seedAsset.execute();
  await seedInvestment.execute();
  await seedAccountEvents.execute();
  await seedInvestmentEvents.execute();
};

seeder()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
