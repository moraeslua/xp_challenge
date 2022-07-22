import { AccountEventType, InvestmentEventType } from '@prisma/client';

export interface IWithdrawInput {
  id: number;
  value: number;
}

export interface IWithdrawOutput {
  id: number;
  accountId: number;
  value: number;
  type: AccountEventType;
  createdAt: Date;
}

export interface IDepositInput {
  id: number;
  value: number;
}

export interface IDepositOutput {
  id: number;
  accountId: number;
  value: number;
  type: AccountEventType;
  createdAt: Date;
}

export class IGetByIdInput {
  id: number;
}

export interface IGetByIdOutput {
  id: number;
  email: string;
  fullName: string;
  birthDate: Date;
  balance: number;
}

export interface IGetInvestmentsInput {
  accountId: number;
}

export interface IGetInvestmentsOutput {
  accountId: number;
  assetId: number;
  amount: number;
  price: number;
}

export interface IGetInvestmentEventsInput {
  accountId: number;
  limit: number;
  offset: number;
}

export interface IGetInvestmentEventsOutput {
  id: number;
  accountId: number;
  assetId: number;
  symbol: string;
  price: number;
  amount: number;
  type: InvestmentEventType;
  createdAt: Date;
}

export interface IAccountService {
  getInvestmentEvents(
    data: IGetInvestmentEventsInput,
  ): Promise<IGetInvestmentEventsOutput[]>;
  getById(data: IGetByIdInput): Promise<IGetByIdOutput>;
  withdrawFromAccount(data: IWithdrawInput): Promise<IWithdrawOutput>;
  depositOnAccount(data: IDepositInput): Promise<IDepositOutput>;
  getInvestments(data: IGetInvestmentsInput): Promise<IGetInvestmentsOutput[]>;
}
