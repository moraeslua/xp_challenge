import { PrismaClient } from '@prisma/client';
import {
  IAccountRepository,
  IAccountTransactionData,
  IAccountTransactionResult,
  ICreateAccountData,
  ICreateAccountEventData,
  ICreateAccountResult,
  IGetByEmailData,
  IGetByEmailResult,
  IGetByIdData,
  IGetByIdResult,
  IUpdateBalanceData,
} from '../interfaces/account.repository.interface';

export class PrismaAccountRepository implements IAccountRepository {
  constructor(private client: PrismaClient) {}
  public async getByEmail({
    email,
  }: IGetByEmailData): Promise<IGetByEmailResult> {
    const result = await this.client.account.findUnique({
      where: { email },
    });

    return result;
  }

  public async create(data: ICreateAccountData): Promise<ICreateAccountResult> {
    const { email, fullName, birthDate, hashedPassword } = data;

    const result = await this.client.$queryRaw<ICreateAccountResult[]>`
      INSERT INTO "Account" ("email", "fullName", "birthDate", "hashedPassword")
      VALUES (${email}, ${fullName}, ${birthDate}, ${hashedPassword})
      RETURNING "id", "email", "fullName", "birthDate", "hashedPassword", "balance";
    `;

    return result[0];
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
