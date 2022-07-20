import { InvestmentEventType } from '@prisma/client';
import { HttpException, HttpStatus } from '../../helpers';
import { IAccountRepository } from '../account/interfaces/account.repository.interface';
import { IAssetRepository } from '../asset/interfaces/asset.repository.interface';
import { IInvestimentRepository } from './interfaces/investment.repository.interface';
import {
  IBuyStockInput,
  IBuyStockOutput,
  IInvestmentService,
  ISellStockInput,
  ISellStockOutput,
} from './interfaces/investment.service.interface';
import { InvestmentValidator } from './validator/investment-validator';

export class InvestmentService implements IInvestmentService {
  constructor(
    private investmentRepository: IInvestimentRepository,
    private assetRepository: IAssetRepository,
    private accountRepository: IAccountRepository,
  ) {}

  public async sellStock(input: ISellStockInput): Promise<ISellStockOutput> {
    const { accountId, assetId, amount } = input;

    await InvestmentValidator.sellStock({ accountId, assetId, amount });

    const investment = await this.investmentRepository.findById({
      accountId,
      assetId,
    });

    if (!investment) {
      throw new HttpException(
        'Account does not have investment on this asset',
        HttpStatus.FORBIDDEN,
      );
    }

    if (investment.amount < amount) {
      throw new HttpException(
        'Such amount not available to sell',
        HttpStatus.FORBIDDEN,
      );
    }

    const asset = await this.assetRepository.findById({ id: assetId });

    if (!asset) {
      throw new HttpException('Asset does not exists.', HttpStatus.NOT_FOUND);
    }

    const account = await this.accountRepository.getById({ id: accountId });

    if (!account) {
      throw new HttpException('Account does not exists', HttpStatus.NOT_FOUND);
    }

    const newAssetAmount: number = asset.amount + amount;
    const newAccountAmount: number = investment.amount - amount;
    const newBalance = account.balance + asset.price * amount;

    const shouldRemoveInvestment = newAccountAmount <= 0;

    const result = await this.investmentRepository.upsertInvestmentTransaction({
      accountId,
      assetId,
      amount,
      price: asset.price,
      type: InvestmentEventType.SELL,
      assetAmount: newAssetAmount,
      accountBalance: newBalance,
      totalAmountInvestedbyAccount: newAccountAmount,
      shouldRemoveInvestment,
    });

    return result;
  }

  public async buyStock(input: IBuyStockInput): Promise<IBuyStockOutput> {
    const { accountId, assetId, amount } = input;
    await InvestmentValidator.buyStock({ accountId, assetId, amount });

    const asset = await this.assetRepository.findById({ id: assetId });

    if (!asset) {
      throw new HttpException('Asset does not exists.', HttpStatus.NOT_FOUND);
    }

    const account = await this.accountRepository.getById({ id: accountId });

    if (!account) {
      throw new HttpException('Account does not exists.', HttpStatus.NOT_FOUND);
    }

    if (asset.amount < amount) {
      throw new HttpException(
        'Such amount not available to sell',
        HttpStatus.FORBIDDEN,
      );
    }

    const totalPrice = amount * asset.price;

    if (account.balance < totalPrice) {
      throw new HttpException(
        'The account has no balance for this operation',
        HttpStatus.FORBIDDEN,
      );
    }

    const investment = await this.investmentRepository.findById({
      accountId,
      assetId,
    });

    const newAssetAmount = asset.amount - amount;
    const newAccountAmount = investment ? investment.amount + amount : amount;

    const result = await this.investmentRepository.upsertInvestmentTransaction({
      accountId,
      amount,
      assetId,
      price: asset.price,
      type: InvestmentEventType.BUY,
      assetAmount: newAssetAmount,
      accountBalance: account.balance - totalPrice,
      totalAmountInvestedbyAccount: newAccountAmount,
      shouldRemoveInvestment: false,
    });

    return result;
  }
}
