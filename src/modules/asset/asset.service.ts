import { HttpStatus } from 'src/helpers';
import { HttpException } from 'src/helpers/http-exception';
import { IAssetRepository } from './interfaces/asset.repository.interface';
import {
  IAssetService,
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
}
