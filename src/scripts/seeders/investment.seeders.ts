import { PrismaClient } from '@prisma/client';

const seeds = [
  {
    accountId: 1,
    assetId: 2,
    amount: 1,
  },
  {
    accountId: 1,
    assetId: 10,
    amount: 10,
  },
  {
    accountId: 2,
    assetId: 1,
    amount: 100,
  },
  {
    accountId: 3,
    assetId: 4,
    amount: 3,
  },
];

export class SeedInvestment {
  constructor(private client: PrismaClient) {}
  async execute() {
    await this.client.investment.createMany({
      data: seeds,
      skipDuplicates: true,
    });
  }
}
