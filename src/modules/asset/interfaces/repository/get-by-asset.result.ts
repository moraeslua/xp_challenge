export class IGetByAssetResult {
  id: number;
  amount: number;
  price: number;
  symbol: string;
  exchangeShortName: string;
}

export interface IGetByClientResult {
  assetId: number;
  accountId: number;
  amount: number;
  price: number;
}
