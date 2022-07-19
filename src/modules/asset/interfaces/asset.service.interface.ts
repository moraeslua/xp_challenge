export interface IGetByAssetInput {
  id: number;
}

export interface IGetByAssetOutput {
  id: number;
  amount: number;
  price: number;
  symbol: string;
  exchangeShortName: string;
}

export interface IGetAllByAccountInput {
  accountId: number;
}

export interface IGetAllByAccountOutput {
  accountId: number;
  assetId: number;
  amount: number;
  price: number;
}

export interface IAssetService {
  getById(data: IGetByAssetInput): Promise<IGetByAssetOutput>;
  getAllByAccount(data: IGetAllByAccountInput): Promise<IGetAllByAccountOutput>;
}
