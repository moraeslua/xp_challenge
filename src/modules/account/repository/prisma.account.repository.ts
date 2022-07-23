import { PrismaClient } from '@prisma/client';
import {
  IGetByIdData,
  IGetByIdResult,
  IGetByEmailData,
  IGetByEmailResult,
  ICreateAccountData,
  IAccountRepository,
  IUpdateBalanceData,
  IGetInvestmentsData,
  ICreateAccountResult,
  IGetInvestmentsResult,
  ICreateAccountEventData,
  IAccountTransactionData,
  IAccountTransactionResult,
  IGetInvestmentEventsData,
  IGetInvestmentEventsResult,
  IGetEventsData,
  IGetEventsResult,
} from '../interfaces/account.repository.interface';

export class PrismaAccountRepository implements IAccountRepository {
  constructor(private client: PrismaClient) {}
  public async getEvents(data: IGetEventsData): Promise<IGetEventsResult[]> {
    const { accountId, limit, offset } = data;
    const result = await this.client.$queryRaw<IGetEventsResult[]>`
    (SELECT
      "accountId",
      "createdAt",
      "value",
      a."type" AS "accountEventType",
      NULL AS "investmentEventType"
      FROM "AccountEvents" as a WHERE "accountId" = ${accountId})
    UNION ALL 
    (SELECT 
      "accountId",
      "createdAt",
      ("amount" * "price") AS value,
      NULL AS "accountEventType",
      i."type" AS "investmentEventType"
      FROM "InvestmentEvents" as i WHERE "accountId" = ${accountId})
      ORDER BY "createdAt" DESC
      LIMIT ${limit} OFFSET ${offset};
    `;
    return result;
  }

  public async getInvestmentEvents(
    data: IGetInvestmentEventsData,
  ): Promise<IGetInvestmentEventsResult[]> {
    const { accountId, limit, offset } = data;

    const result = await this.client.$queryRaw<IGetInvestmentEventsResult[]>`
      SELECT
        i.id, i."accountId", i."assetId", a.symbol, i.price,
        i.amount, i.type, i."createdAt" 
      FROM "InvestmentEvents" as i 
      INNER JOIN "Asset" as a ON a.id = i."assetId"
      WHERE i."accountId" = ${accountId}
      ORDER BY "createdAt" DESC
      LIMIT ${limit} OFFSET ${offset};
    `;
    return result;
  }
  public async getInvestments({
    accountId,
  }: IGetInvestmentsData): Promise<IGetInvestmentsResult[]> {
    const result = await this.client.$queryRaw<IGetInvestmentsResult[]>`
      SELECT i."accountId", i."assetId", i."amount", a.price FROM "Investment" as i 
      LEFT JOIN "Asset" as a ON a.id = i."assetId" 
      WHERE "accountId" = ${accountId}
    `;

    return result;
  }
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
