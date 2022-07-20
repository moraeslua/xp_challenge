export class IGetAssetByIdResult {
  id: number;
  amount: number;
  price: number;
  symbol: string;
  exchangeShortName: string;
}

export interface IGetAssetByIdData {
  id: number;
}

export interface IUpdateAssetAmountData {
  id: number;
  amount: number;
}

export interface IUpdateAssetAmountResult {
  id: number;
  symbol: string;
  amount: number;
}

export interface IAssetRepository {
  findById(data: IGetAssetByIdData): Promise<IGetAssetByIdResult>;
  updateAmount(data: IUpdateAssetAmountData): Promise<IUpdateAssetAmountResult>;
}
