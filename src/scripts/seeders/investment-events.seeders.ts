import { InvestmentEventType, PrismaClient } from '@prisma/client';

const seeds = [
  {
    accountId: 1,
    assetId: 2,
    price: 2235.55,
    amount: 1,
    type: InvestmentEventType.BUY,
  },
  {
    accountId: 1,
    assetId: 10,
    price: 157.62,
    amount: 2,
    type: InvestmentEventType.SELL,
  },
  {
    accountId: 2,
    assetId: 1,
    price: 150.17,
    amount: 10,
    type: InvestmentEventType.BUY,
  },
  {
    accountId: 3,
    assetId: 4,
    price: 113.55,
    amount: 3,
    type: InvestmentEventType.BUY,
  },
];

export class SeedInvestmentEvents {
  constructor(private client: PrismaClient) {}
  async execute() {
    await this.client.investmentEvents.createMany({
      data: seeds,
      skipDuplicates: true,
    });
  }
}
