export interface IGetByAssetInput {
  id: number;
}

export interface IGetByAssetOutput {
  id: number;
  symbol: string;
  companyName: string;
  price: number;
  exchange: string;
  exchangeShortName: string;
  amount: number;
}

export interface IGetAllInput {
  limit: number;
  offset: number;
}

export interface IGetAllOutput {
  id: number;
  symbol: string;
  companyName: string;
  price: number;
  exchange: string;
  exchangeShortName: string;
  amount: number;
}

export interface IAssetService {
  getAll(data: IGetAllInput): Promise<IGetAllOutput[]>;
  getById(data: IGetByAssetInput): Promise<IGetByAssetOutput>;
}
