import { AccountEventType, PrismaClient } from '@prisma/client';

const seeds = [
  {
    value: 5000.12,
    accountId: 1,
    type: AccountEventType.DEPOSIT,
  },
  {
    value: 800,
    accountId: 1,
    type: AccountEventType.DEPOSIT,
  },
  {
    value: 400,
    accountId: 1,
    type: AccountEventType.WITHDRAW,
  },
  {
    value: 3000.5,
    accountId: 2,
    type: AccountEventType.DEPOSIT,
  },
  {
    value: 2000,
    accountId: 3,
    type: AccountEventType.DEPOSIT,
  },
];

export class SeedAccountEvents {
  constructor(private client: PrismaClient) {}
  async execute() {
    await this.client.accountEvents.createMany({
      data: seeds,
    });
  }
}
