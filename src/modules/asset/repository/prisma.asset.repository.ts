import { PrismaClient } from '@prisma/client';
import {
  IAssetRepository,
  IGetAllData,
  IGetAllResponse,
  IGetAssetByIdData,
  IGetAssetByIdResult,
  IUpdateAssetAmountData,
  IUpdateAssetAmountResult,
} from '../interfaces/asset.repository.interface';

export class PrismaAssetRepository implements IAssetRepository {
  constructor(private client: PrismaClient) {}
  public async getAll(data: IGetAllData): Promise<IGetAllResponse[]> {
    const { limit, offset } = data;

    const assets = await this.client.asset.findMany({
      skip: offset,
      take: limit,
    });

    return assets;
  }

  public async updateAmount(
    data: IUpdateAssetAmountData,
  ): Promise<IUpdateAssetAmountResult> {
    const { id, amount } = data;
    const result = await this.client.asset.update({
      where: { id },
      data: { amount },
    });
    console.log('update asset result:', result);
    return result;
  }

  public async findById({
    id,
  }: IGetAssetByIdData): Promise<IGetAssetByIdResult> {
    const result = await this.client.asset.findUnique({
      where: { id },
    });

    return result;
  }
}
