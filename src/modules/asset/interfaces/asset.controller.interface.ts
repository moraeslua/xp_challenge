export interface IGetByAssetRequest {
  id: number;
}

export interface IGetByAssetResponse {
  id: number;
  amount: number;
  price: number;
  symbol: string;
  exchangeShortName: string;
}
