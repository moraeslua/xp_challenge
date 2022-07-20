import { IAssetRepository } from 'src/modules/asset/interfaces/asset.repository.interface';

export class AssetRepositoryMock implements IAssetRepository {
  findById = jest.fn();
  updateAmount = jest.fn();
}
