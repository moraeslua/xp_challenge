import { validate } from 'class-validator';
import { formatError, HttpException } from 'src/helpers';
import {
  IDepositInput,
  IGetByIdInput,
  IWithdrawInput,
} from '../interfaces/account.service.interface';
import {
  DepositOnAccountSchema,
  GetByIdSchema,
  WithdrawFromAccountSchema,
} from './account-schemas';

export class AccountValidator {
  private static async execute(inputs: object): Promise<void> {
    const response = await validate(inputs);

    if (response.length) {
      const { message, status } = formatError(response);

      throw new HttpException(message, status);
    }
  }

  static async getById({ id }: IGetByIdInput): Promise<void> {
    const inputs = new GetByIdSchema({ id });
    await this.execute(inputs);
  }

  static async depositOnAccount({ id, value }: IDepositInput): Promise<void> {
    const inputs = new DepositOnAccountSchema({ id, value });
    await this.execute(inputs);
  }

  static async withdrawFromAccount({
    id,
    value,
  }: IWithdrawInput): Promise<void> {
    const inputs = new WithdrawFromAccountSchema({ id, value });
    await this.execute(inputs);
  }
}
