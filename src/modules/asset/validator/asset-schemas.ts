import { IsInt, IsNotEmpty } from 'class-validator';

export class GetByAssetSchema {
  constructor({ id }) {
    this.id = id;
  }

  @IsNotEmpty()
  @IsInt()
  id: number;
}

export class GetAllSchema {
  constructor({ limit, offset }) {
    this.limit = limit;
    this.offset = offset;
  }

  @IsNotEmpty()
  @IsInt()
  limit: number;

  @IsNotEmpty()
  @IsInt()
  offset: number;
}
