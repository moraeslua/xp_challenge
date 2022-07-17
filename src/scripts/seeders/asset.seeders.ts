import { PrismaClient } from '@prisma/client';
import assetsData from './data/assets.data.json';

const MAX_AMOUNT = 200;
const MIN_AMOUNT = 50;

const getArbitraryAmount = (): number => {
  return Math.floor(Math.random() * (MAX_AMOUNT - MIN_AMOUNT) + MIN_AMOUNT);
};

export class SeedAsset {
  constructor(private client: PrismaClient) {}
  async execute() {
    const seeds = assetsData.map(
      ({ symbol, companyName, price, exchange, exchangeShortName }) => ({
        symbol,
        companyName,
        price,
        exchange,
        exchangeShortName,
        amount: getArbitraryAmount(),
      }),
    );
    await this.client.asset.createMany({ data: seeds, skipDuplicates: true });
  }
}
