import { InvestmentEventType } from '@prisma/client';

export interface IBuyStockOutput {
  id: number;
  accountId: number;
  assetId: number;
  amount: number;
  price: number;
  type: InvestmentEventType;
  createdAt: Date;
}

export interface IBuyStockInput {
  accountId: number;
  assetId: number;
  amount: number;
}

export interface ISellStockOutput {
  id: number;
  accountId: number;
  assetId: number;
  amount: number;
  price: number;
  type: InvestmentEventType;
  createdAt: Date;
}

export interface ISellStockInput {
  accountId: number;
  assetId: number;
  amount: number;
}

export enum TransactionType {
  UPSERT,
  REMOVE,
}

export interface IInvestmentService {
  buyStock(input: IBuyStockInput): Promise<IBuyStockOutput>;
  sellStock(input: ISellStockInput): Promise<ISellStockOutput>;
}
