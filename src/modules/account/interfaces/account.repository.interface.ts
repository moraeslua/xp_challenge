import { AccountEventType } from '@prisma/client';

export interface ICreateAccountData {
  email: string;
  fullName: string;
  birthDate: Date;
  hashedPassword: string;
}

export interface ICreateAccountResult {
  id: number;
  email: string;
  fullName: string;
  birthDate: Date;
  hashedPassword: string;
  balance: number;
}

export interface IGetByIdData {
  id: number;
}

export interface IGetByIdResult {
  id: number;
  email: string;
  fullName: string;
  birthDate: Date;
  hashedPassword: string;
  balance: number;
}

export interface IUpdateBalanceData {
  id: number;
  balance: number;
}

// export interface IUpdateBalanceResult {
//   id: number;
//   value: number; // retorno valor depositado ou saldo?
// }

export interface IAccountTransactionData {
  accountId: number;
  value: number;
  balance: number;
  type: AccountEventType;
}

export interface IAccountTransactionResult {
  id: number;
  accountId: number;
  value: number;
  type: AccountEventType;
  createdAt: Date;
  // adicionar saldo do dia
}

export interface ICreateAccountEventData {
  accountId: number;
  value: number;
  type: AccountEventType;
}

export interface IGetByEmailData {
  email: string;
}

export interface IGetByEmailResult {
  id: number;
  email: string;
  fullName: string;
  birthDate: Date;
  hashedPassword: string;
  balance: number;
}

export interface IGetInvestmentsData {
  accountId: number;
}

export interface IGetInvestmentsResult {
  assetId: number;
  accountId: number;
  amount: number;
  price: number;
}

export interface IAccountRepository {
  getInvestments(data: IGetInvestmentsData): Promise<IGetInvestmentsResult>;
  getByEmail(data: IGetByEmailData): Promise<IGetByEmailResult>;
  getById(data: IGetByIdData): Promise<IGetByIdResult>;
  create(data: ICreateAccountData): Promise<ICreateAccountResult>;
  executeAccountTransaction(
    data: IAccountTransactionData,
  ): Promise<IAccountTransactionResult>;
}
