import { IGetByAssetResult, IGetByClientResult } from './get-by-asset.result';

export interface IGetByAssetData {
  assetId: number;
}

export interface IGetByClientData {
  accountId: number;
}

export interface IAssetRepository {
  findByAsset(data: IGetByAssetData): Promise<IGetByAssetResult>;
  findByClient(data: IGetByClientData): Promise<IGetByClientResult>;
}
