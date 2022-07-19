import { validate } from 'class-validator';
import { formatError, HttpException } from 'src/helpers';
import {
  IBuyStockInput,
  ISellStockInput,
} from '../interfaces/investment.service.interface';
import { BuyStockSchema, SellStockSchema } from './investment-schemas';

export class InvestmentValidator {
  private static async execute(inputs: object): Promise<void> {
    const response = await validate(inputs);

    if (response.length) {
      const { message, status } = formatError(response);

      throw new HttpException(message, status);
    }
  }

  static async buyStock({
    accountId,
    assetId,
    amount,
  }: IBuyStockInput): Promise<void> {
    const inputs = new BuyStockSchema({ accountId, assetId, amount });
    //
    await this.execute(inputs);
  }

  static async sellStock({
    accountId,
    assetId,
    amount,
  }: ISellStockInput): Promise<void> {
    const inputs = new SellStockSchema({ accountId, assetId, amount });

    await this.execute(inputs);
  }
}
