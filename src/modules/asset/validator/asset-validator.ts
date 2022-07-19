import { validate } from 'class-validator';
import { formatError, HttpException } from 'src/helpers';
import {
  IGetAllByAccountInput,
  IGetByAssetInput,
} from '../interfaces/asset.service.interface';
import { GetByAccountSchema, GetByAssetSchema } from './asset-schemas';

export class AssetValidator {
  private static async execute(inputs: object): Promise<void> {
    const response = await validate(inputs);

    if (response.length) {
      const { message, status } = formatError(response);

      throw new HttpException(message, status);
    }
  }

  static async getByAsset({ id }: IGetByAssetInput): Promise<void> {
    const inputs = new GetByAssetSchema({ id });
    //
    await this.execute(inputs);
  }

  static async getByAccount({
    accountId,
  }: IGetAllByAccountInput): Promise<void> {
    const inputs = new GetByAccountSchema({ accountId });

    await this.execute(inputs);
  }
}
