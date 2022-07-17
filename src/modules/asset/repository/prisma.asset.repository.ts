import { PrismaClient } from '@prisma/client';
import {
  IAssetRepository,
  IGetByAssetData,
  IGetByClientData,
} from '../interfaces/repository/get-by-asset.data';
import {
  IGetByAssetResult,
  IGetByClientResult,
} from '../interfaces/repository/get-by-asset.result';

export class PrismaAssetRepository implements IAssetRepository {
  constructor(private client: PrismaClient) {}
  async findByAsset({ assetId }: IGetByAssetData): Promise<IGetByAssetResult> {
    const response = await this.client.asset.findUnique({
      where: { id: assetId },
    });

    return response;
  }

  async findByClient({
    accountId,
  }: IGetByClientData): Promise<IGetByClientResult> {
    const response: IGetByClientResult = await this.client
      .$queryRaw`SELECT i."accountId", i."assetId", i."amount", a.price FROM "Investment" as i 
      LEFT JOIN "Asset" as a ON a.id = i."assetId" 
      WHERE "accountId" = ${accountId} `;

    return response;
  }
}
