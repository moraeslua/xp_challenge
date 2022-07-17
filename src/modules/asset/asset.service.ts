import { HttpException } from 'src/helpers/http-exception';
import { IAssetRepository } from './interfaces/repository/get-by-asset.data';
import { IGetByAssetInput } from './interfaces/service/get-by-asset.input';
import { AssetValidator } from './validator/asset-validator';

export class AssetService {
  constructor(private assetRepository: IAssetRepository) {}

  async findByClient() {
    //
  }

  async findById({ assetId }: IGetByAssetInput) {
    await AssetValidator.getByAsset({ assetId });

    const asset = await this.assetRepository.findByAsset({ assetId });
    return asset;
  }
}
