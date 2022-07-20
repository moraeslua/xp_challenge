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

export interface IAssetService {
  getById(data: IGetByAssetInput): Promise<IGetByAssetOutput>;
}
