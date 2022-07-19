import { PrismaClient } from '@prisma/client';
import {
  IGetByIdData,
  IGetByIdResult,
  IUpsertInvestmentData,
  IInvestimentRepository,
  ICreateInvestmentEventData,
  ICreateInvestmentTransactionData,
  ICreateInvestmentTransactionResult,
  IRemoveInvestmentData,
} from '../interfaces/investment.repository.interface';

export class PrismaInvestmentRepository implements IInvestimentRepository {
  private queries = {
    updateAssetAmount: 'UPDATE "Asset" SET "amount" = $1 WHERE id = $2;',
    updateAccountBalance: 'UPDATE "Account" SET "balance" = $1 WHERE id = $2;',
  };

  constructor(private client: PrismaClient) {}
  public async findById(data: IGetByIdData): Promise<IGetByIdResult> {
    const { accountId, assetId } = data;

    const result = await this.client.investment.findUnique({
      where: { accountId_assetId: { accountId, assetId } },
    });

    return result;
  }

  private upsertInvestment(data: IUpsertInvestmentData) {
    const { accountId, assetId, amount } = data;

    const result = this.client.investment.upsert({
      where: { accountId_assetId: { accountId, assetId } },
      update: { amount },
      create: { accountId, assetId, amount },
    });
    return result;
  }

  private createInvestmentEvent(data: ICreateInvestmentEventData) {
    const { accountId, assetId, amount, price, type } = data;

    const result = this.client.investmentEvents.create({
      data: { accountId, assetId, amount, price, type },
    });

    return result;
  }

  private removeInvestment = (data: IRemoveInvestmentData) => {
    const { accountId, assetId } = data;

    const result = this.client.investment.delete({
      where: { accountId_assetId: { accountId, assetId } },
    });

    return result;
  };

  public async upsertInvestmentTransaction(
    data: ICreateInvestmentTransactionData,
  ): Promise<ICreateInvestmentTransactionResult> {
    const {
      accountId,
      assetId,
      amount,
      price,
      type,
      assetAmount,
      accountBalance,
      totalAmountInvestedbyAccount,
      shouldRemoveInvestment,
    } = data;

    const removeInvestment = this.removeInvestment({
      accountId,
      assetId,
    });

    const upsertInvestment = this.upsertInvestment({
      accountId,
      assetId,
      amount: totalAmountInvestedbyAccount,
    });

    const createInvestmentEvent = this.createInvestmentEvent({
      accountId,
      assetId,
      amount,
      price,
      type,
    });

    const updateInvestment = shouldRemoveInvestment
      ? removeInvestment
      : upsertInvestment;

    const [_upsert, newEvent] = await this.client.$transaction([
      updateInvestment,
      createInvestmentEvent,
      this.client.$queryRawUnsafe(
        this.queries.updateAssetAmount,
        assetAmount,
        assetId,
      ),
      this.client.$queryRawUnsafe(
        this.queries.updateAccountBalance,
        accountBalance,
        accountId,
      ),
    ]);

    return newEvent;
  }
}
