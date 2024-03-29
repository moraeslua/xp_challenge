import { PrismaClient } from '@prisma/client';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';
import { IAssetRepository } from './interfaces/asset.repository.interface';
import { PrismaAssetRepository } from './repository/prisma.asset.repository';

export class AssetModule {
  public assetRepository: IAssetRepository;
  private assetService: AssetService;
  public assetController: AssetController;

  constructor(client: PrismaClient) {
    this.assetRepository = new PrismaAssetRepository(client);
    this.assetService = new AssetService(this.assetRepository);
    this.assetController = new AssetController(this.assetService);
  }
}
