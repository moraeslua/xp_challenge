import { IAccountRepository } from 'src/modules/account/interfaces/account.repository.interface';

export class AccountRepositoryMock implements IAccountRepository {
  getInvestments = jest.fn();
  getByEmail = jest.fn();
  getById = jest.fn();
  create = jest.fn();
  executeAccountTransaction = jest.fn();
}
