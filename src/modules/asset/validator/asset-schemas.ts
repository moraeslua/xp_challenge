import { IsInt, IsNotEmpty } from 'class-validator';

export class GetByAssetSchema {
  constructor({ id }) {
    this.id = id;
  }

  @IsNotEmpty()
  @IsInt()
  id: number;
}
