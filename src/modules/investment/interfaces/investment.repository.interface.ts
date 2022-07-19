import { InvestmentEventType } from '@prisma/client';

export interface ICreateInvestmentTransactionData {
  accountId: number;
  assetId: number;
  amount: number;
  price: number;
  type: InvestmentEventType;
  accountBalance: number;
  assetAmount: number;
  totalAmountInvestedbyAccount: number;
  shouldRemoveInvestment: boolean;
}

export interface ICreateInvestmentTransactionResult {
  id: number;
  accountId: number;
  assetId: number;
  amount: number;
  price: number;
  type: InvestmentEventType;
  createdAt: Date;
}

export interface IRemoveInvestmentTransactionData {
  accountId: number;
  assetId: number;
  amount: number;
  price: number;
  type: InvestmentEventType;
  accountBalance: number;
  assetAmount: number;
}

export interface IRemoveInvestmentTransactionResult {
  id: number;
  accountId: number;
  assetId: number;
  amount: number;
  price: number;
  type: InvestmentEventType;
  createdAt: Date;
}

export interface IGetByIdData {
  accountId: number;
  assetId: number;
}

export interface IGetByIdResult {
  accountId: number;
  assetId: number;
  amount: number;
}

export interface IUpsertInvestmentData {
  accountId: number;
  assetId: number;
  amount: number;
}

export interface IRemoveInvestmentData {
  accountId: number;
  assetId: number;
}

export interface ICreateInvestmentEventData {
  accountId: number;
  assetId: number;
  amount: number;
  price: number;
  type: InvestmentEventType;
}

export interface IInvestimentRepository {
  findById(data: IGetByIdData): Promise<IGetByIdResult>;
  // removeInvestmentTransaction(
  //   data: IRemoveInvestmentTransactionData,
  // ): Promise<IRemoveInvestmentTransactionResult>;
  upsertInvestmentTransaction(
    data: ICreateInvestmentTransactionData,
  ): Promise<ICreateInvestmentTransactionResult>;
}
