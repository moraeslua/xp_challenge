import { HttpException, HttpStatus } from '../../helpers';
import { IAssetRepository } from './interfaces/asset.repository.interface';
import {
  IAssetService,
  IGetAllInput,
  IGetAllOutput,
  IGetByAssetInput,
  IGetByAssetOutput,
} from './interfaces/asset.service.interface';
import { AssetValidator } from './validator/asset-validator';

export class AssetService implements IAssetService {
  constructor(private assetRepository: IAssetRepository) {}

  public async getAll(data: IGetAllInput): Promise<IGetAllOutput[]> {
    const { limit, offset } = data;
    await AssetValidator.getAll({ limit, offset });

    const assets = await this.assetRepository.getAll({ limit, offset });
    return assets;
  }

  public async getById({ id }: IGetByAssetInput): Promise<IGetByAssetOutput> {
    await AssetValidator.getByAsset({ id });
    const asset = await this.assetRepository.findById({ id });

    if (!asset) {
      throw new HttpException('Asset not found', HttpStatus.NOT_FOUND);
    }

    return asset;
  }
}
