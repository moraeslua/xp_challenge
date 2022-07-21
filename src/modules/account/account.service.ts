import { AccountEventType } from '@prisma/client';
import { HttpException, HttpStatus } from '../../helpers';
import { IAccountRepository } from './interfaces/account.repository.interface';
import {
  IAccountService,
  IDepositInput,
  IDepositOutput,
  IGetByIdInput,
  IGetByIdOutput,
  IGetInvestmentsInput,
  IGetInvestmentsOutput,
  IWithdrawInput,
  IWithdrawOutput,
} from './interfaces/account.service.interface';
import { AccountValidator } from './validator/account-validator';

export class AccountService implements IAccountService {
  constructor(private accountRepository: IAccountRepository) {}
  public async getInvestments({
    accountId,
  }: IGetInvestmentsInput): Promise<IGetInvestmentsOutput> {
    await AccountValidator.getInvestments({ accountId });
    const investments = await this.accountRepository.getInvestments({
      accountId,
    });
    return investments;
  }

  public async getById({ id }: IGetByIdInput): Promise<IGetByIdOutput> {
    await AccountValidator.getById({ id });

    const result = await this.accountRepository.getById({ id });

    if (!result) {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }

    delete result.hashedPassword;

    return result;
  }

  public async depositOnAccount(data: IDepositInput): Promise<IDepositOutput> {
    const { id, value } = data;
    await AccountValidator.depositOnAccount({ id, value });

    const account = await this.accountRepository.getById({
      id,
    });

    if (!account) {
      throw new HttpException('Account does not exists.', HttpStatus.NOT_FOUND);
    }

    const newBalance = account.balance + value;

    const result = await this.accountRepository.executeAccountTransaction({
      accountId: id,
      value,
      balance: newBalance,
      type: AccountEventType.DEPOSIT,
    });

    return result;
  }

  public async withdrawFromAccount(
    data: IWithdrawInput,
  ): Promise<IWithdrawOutput> {
    const { id, value } = data;
    await AccountValidator.withdrawFromAccount({ id, value });

    const account = await this.accountRepository.getById({
      id,
    });

    if (!account) {
      throw new HttpException('Account does not exists.', HttpStatus.NOT_FOUND);
    }

    const newBalance = account.balance - value;

    if (newBalance < 0) {
      throw new HttpException(
        'Such amount is not available on account',
        HttpStatus.FORBIDDEN,
      );
    }

    const result = await this.accountRepository.executeAccountTransaction({
      accountId: id,
      value,
      balance: newBalance,
      type: AccountEventType.WITHDRAW,
    });

    return result;
  }
}
