import { PrismaClient } from '@prisma/client';
import {
  IAccountRepository,
  IAccountTransactionData,
  IAccountTransactionResult,
  ICreateAccountData,
  ICreateAccountEventData,
  ICreateAccountResult,
  IGetByIdData,
  IGetByIdResult,
  IUpdateBalanceData,
} from '../interfaces/account.repository.interface';

export class PrismaAccountRepository implements IAccountRepository {
  constructor(private client: PrismaClient) {}

  public async create(data: ICreateAccountData): Promise<ICreateAccountResult> {
    throw new Error('Method not implemented.');
  }

  public async getById({ id }: IGetByIdData): Promise<IGetByIdResult> {
    const result = await this.client.account.findUnique({
      where: { id },
    });
    return result;
  }

  private updateBalance(data: IUpdateBalanceData) {
    const { id, balance } = data;
    const result = this.client.account.update({
      where: { id },
      data: { balance },
    });
    return result;
  }

  private createAccountEvent(data: ICreateAccountEventData) {
    const { accountId, value, type } = data;
    const result = this.client.accountEvents.create({
      data: { accountId, value, type },
    });

    return result;
  }

  public async executeAccountTransaction(
    data: IAccountTransactionData,
  ): Promise<IAccountTransactionResult> {
    const { accountId, value, balance, type } = data;

    const createAccountEvent = this.createAccountEvent({
      accountId,
      value,
      type,
    });

    const updateBalance = this.updateBalance({ id: accountId, balance });

    const [_update, newTransaction] = await this.client.$transaction([
      updateBalance,
      createAccountEvent,
    ]);

    return newTransaction as unknown as IAccountTransactionResult;
  }
}
