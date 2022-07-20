import { AccountEventType } from '@prisma/client';

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

export interface IAccountService {
  getById(data: IGetByIdInput): Promise<IGetByIdOutput>;
  withdrawFromAccount(data: IWithdrawInput): Promise<IWithdrawOutput>;
  depositOnAccount(data: IDepositInput): Promise<IDepositOutput>;
  getInvestments(data: IGetInvestmentsInput): Promise<IGetInvestmentsOutput>;
}
