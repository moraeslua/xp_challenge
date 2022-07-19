import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class BuyStockSchema {
  constructor({ accountId, assetId, amount }) {
    this.accountId = accountId;
    this.assetId = assetId;
    this.amount = amount;
  }

  @IsNotEmpty()
  @IsInt()
  accountId: number;

  @IsNotEmpty()
  @IsInt()
  assetId: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}

export class SellStockSchema {
  constructor({ accountId, assetId, amount }) {
    this.accountId = accountId;
    this.assetId = assetId;
    this.amount = amount;
  }

  @IsNotEmpty()
  @IsInt()
  accountId: number;

  @IsNotEmpty()
  @IsInt()
  assetId: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
