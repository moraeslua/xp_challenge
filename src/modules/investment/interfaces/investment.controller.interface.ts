export interface IBuyStockRequest {
  accountId: number;
  assetId: number;
  amount: number;
}

export interface ISellStockRequest {
  accountId: number;
  assetId: number;
  amount: number;
}
