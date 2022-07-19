import { HttpStatus } from 'src/helpers';
import { HttpException } from 'src/helpers/http-exception';
import { IAssetRepository } from './interfaces/asset.repository.interface';
import {
  IAssetService,
  IGetAllByAccountInput,
  IGetAllByAccountOutput,
  IGetByAssetInput,
  IGetByAssetOutput,
} from './interfaces/asset.service.interface';
import { AssetValidator } from './validator/asset-validator';

export class AssetService implements IAssetService {
  constructor(private assetRepository: IAssetRepository) {}

  public async getById({ id }: IGetByAssetInput): Promise<IGetByAssetOutput> {
    await AssetValidator.getByAsset({ id });
    const asset = await this.assetRepository.findById({ id });

    if (!asset) {
      throw new HttpException('Asset not found', HttpStatus.NOT_FOUND);
    }

    return asset;
  }

  public async getAllByAccount({
    accountId,
  }: IGetAllByAccountInput): Promise<IGetAllByAccountOutput> {
    await AssetValidator.getByAccount({ accountId });

    const assets = await this.assetRepository.getAllByAccount({ accountId });
    return assets;
  }
}
