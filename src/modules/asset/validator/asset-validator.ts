import { validate } from 'class-validator';
import { formatError, HttpException } from 'src/helpers';
import { IGetByAssetInput } from '../interfaces/service/get-by-asset.input';
import { GetByAssetSchema } from './asset-schemas';

export class AssetValidator {
  static async getByAsset({ assetId }: IGetByAssetInput): Promise<void> {
    const inputs = new GetByAssetSchema({ assetId });

    const response = await validate(inputs);

    if (response.length) {
      const { message, status } = formatError(response);

      throw new HttpException(message, status);
    }
  }
}
