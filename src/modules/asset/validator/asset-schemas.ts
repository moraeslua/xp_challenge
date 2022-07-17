import { IsInt, IsNotEmpty } from 'class-validator';

export class GetByAssetSchema {
  constructor({ assetId }) {
    this.assetId = assetId;
  }

  @IsNotEmpty()
  @IsInt()
  assetId: string;
}
