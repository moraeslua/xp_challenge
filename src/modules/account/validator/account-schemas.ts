import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class ValidateIntIdSchema {
  constructor({ id }) {
    this.id = id;
  }

  @IsNotEmpty()
  @IsInt()
  id: number;
}

export class GetByIdSchema extends ValidateIntIdSchema {
  constructor({ id }) {
    super({ id });
  }
}

export class DepositOnAccountSchema extends ValidateIntIdSchema {
  constructor({ id, value }) {
    super({ id });
    this.value = value;
  }

  @Min(1)
  @IsNotEmpty()
  @IsNumber()
  value: number;
}

export class WithdrawFromAccountSchema extends ValidateIntIdSchema {
  constructor({ id, value }) {
    super({ id });
    this.value = value;
  }

  @Min(1)
  @IsNotEmpty()
  @IsNumber()
  value: number;
}

export class GetInvestmentsSchema {
  constructor({ accountId }) {
    this.accountId = accountId;
  }

  @IsNotEmpty()
  @IsInt()
  accountId: number;
}

export class GetInvestmentEventsSchema {
  constructor({ accountId, limit, offset }) {
    this.accountId = accountId;
    this.limit = limit;
    this.offset = offset;
  }

  @IsNotEmpty()
  @IsInt()
  accountId: number;

  @IsNotEmpty()
  @IsInt()
  limit: number;

  @IsNotEmpty()
  @IsInt()
  offset: number;
}

export class GetEventsSchema {
  constructor({ accountId, limit, offset }) {
    this.accountId = accountId;
    this.limit = limit;
    this.offset = offset;
  }

  @IsNotEmpty()
  @IsInt()
  accountId: number;

  @IsNotEmpty()
  @IsInt()
  limit: number;

  @IsNotEmpty()
  @IsInt()
  offset: number;
}
