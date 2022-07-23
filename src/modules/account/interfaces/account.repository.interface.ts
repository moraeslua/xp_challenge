import { AccountEventType, InvestmentEventType } from '@prisma/client';

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

export interface IGetInvestmentEventsData {
  accountId: number;
  limit: number;
  offset: number;
}

export interface IGetInvestmentEventsResult {
  id: number;
  accountId: number;
  assetId: number;
  symbol: string;
  price: number;
  amount: number;
  type: InvestmentEventType;
  createdAt: Date;
}

export interface IGetEventsData {
  accountId: number;
  limit: number;
  offset: number;
}

export interface IGetEventsResult {
  accountId: number;
  value: number;
  createdAt: Date;
  accountEventType: AccountEventType;
  investmentEventType: InvestmentEventType;
}

export interface IAccountRepository {
  getEvents(data: IGetEventsData): Promise<IGetEventsResult[]>;
  getInvestmentEvents(
    data: IGetInvestmentEventsData,
  ): Promise<IGetInvestmentEventsResult[]>;
  getInvestments(data: IGetInvestmentsData): Promise<IGetInvestmentsResult[]>;
  getByEmail(data: IGetByEmailData): Promise<IGetByEmailResult>;
  getById(data: IGetByIdData): Promise<IGetByIdResult>;
  create(data: ICreateAccountData): Promise<ICreateAccountResult>;
  executeAccountTransaction(
    data: IAccountTransactionData,
  ): Promise<IAccountTransactionResult>;
}
