import { AccountRepositoryMock } from '../../__mocks__/account/account.repository.mock';
import { AccountService } from './account.service';
import { IAccountService } from './interfaces/account.service.interface';

let accountRepository: AccountRepositoryMock;
let accountService: IAccountService;

const clearMocks = () => {
  jest.clearAllMocks();
  accountRepository = new AccountRepositoryMock();
  accountService = new AccountService(accountRepository);
};

describe('Account service tests', () => {
  describe('"deposit on account" method', () => {
    describe('when sucessful', () => {
      const accountGetByIdMock = jest.fn().mockResolvedValue({
        id: 1,
        email: 'salman@email.com',
        fullName: 'Salman Jaramillo',
        birthDate: '2000-05-03T03:00:00.000Z',
        hashedPassword: 'password',
        balance: 2989.98,
      });

      const accountTransactionMock = jest.fn().mockResolvedValue({
        id: 6,
        value: 3000.54,
        type: 'DEPOSIT',
        createdAt: '2022-07-21T02:00:48.073Z',
        accountId: 1,
      });

      beforeEach(() => {
        clearMocks();
        accountRepository.getById = accountGetByIdMock;
        accountRepository.executeAccountTransaction = accountTransactionMock;
      });

      it('should call repository with correct arguments', async () => {
        const result = await accountService.depositOnAccount({
          id: 1,
          value: 3000.54,
        });

        expect(accountRepository.getById).toHaveBeenNthCalledWith(1, { id: 1 });
        expect(
          accountRepository.executeAccountTransaction,
        ).toHaveBeenNthCalledWith(1, {
          accountId: 1,
          value: 3000.54,
          balance: 5990.52,
          type: 'DEPOSIT',
        });

        expect(result).toBeDefined();
      });

      it('should return an object with correct properties and values', async () => {
        const result = await accountService.depositOnAccount({
          id: 1,
          value: 3000.54,
        });

        expect(result).toHaveProperty('id', 6);
        expect(result).toHaveProperty('value', 3000.54);
        expect(result).toHaveProperty('type', 'DEPOSIT');
        expect(result).toHaveProperty('createdAt', '2022-07-21T02:00:48.073Z');
        expect(result).toHaveProperty('accountId', 1);
      });
    });
    describe('when not sucessfull', () => {
      beforeEach(() => clearMocks());

      it('should throw an error if account doest not exists', async () => {
        accountRepository.getById = jest.fn().mockResolvedValue(undefined);

        await expect(
          accountService.depositOnAccount({
            id: 125,
            value: 3000.54,
          }),
        ).rejects.toThrow(new Error('Account does not exists.'));
        //

        expect(accountRepository.getById).toHaveBeenNthCalledWith(1, {
          id: 125,
        });
      });

      it('should throw an error when "id" or "value" are not passed as arguments', async () => {
        await expect(
          accountService.depositOnAccount({
            id: 1,
          } as never),
        ).rejects.toThrow(new Error('value must not be less than 1'));

        await expect(
          accountService.depositOnAccount({
            value: 3000.54,
          } as never),
        ).rejects.toThrow(new Error('id should not be empty'));
      });
    });
  });

  describe('"withdraw from account" method', () => {
    describe('when sucessfull', () => {
      const accountGetByIdMock = jest.fn().mockResolvedValue({
        id: 1,
        email: 'salman@email.com',
        fullName: 'Salman Jaramillo',
        birthDate: '2000-05-03T03:00:00.000Z',
        hashedPassword: 'password',
        balance: 3050.6,
      });

      const accountTransactionMock = jest.fn().mockResolvedValue({
        id: 6,
        value: 1000.15,
        type: 'WITHDRAW',
        createdAt: '2022-07-21T12:40:48.511Z',
        accountId: 1,
      });

      beforeEach(() => {
        clearMocks();
        accountRepository.getById = accountGetByIdMock;
        accountRepository.executeAccountTransaction = accountTransactionMock;
      });

      it('should call repository with correct arguments', async () => {
        const result = await accountService.withdrawFromAccount({
          id: 1,
          value: 1000.15,
        });

        expect(accountRepository.getById).toHaveBeenNthCalledWith(1, { id: 1 });
        expect(
          accountRepository.executeAccountTransaction,
        ).toHaveBeenNthCalledWith(
          1,
          expect.objectContaining({
            accountId: 1,
            value: 1000.15,
            balance: 2050.45,
            type: 'WITHDRAW',
          }),
        );

        expect(result).toBeDefined();
      });
      it('should return an object with correct properties and values', async () => {
        const result = await accountService.withdrawFromAccount({
          id: 1,
          value: 1000.15,
        });

        expect(result).toBeDefined();
        expect(result).toEqual(
          expect.objectContaining({
            id: 6,
            value: 1000.15,
            type: 'WITHDRAW',
            createdAt: '2022-07-21T12:40:48.511Z',
            accountId: 1,
          }),
        );
      });
    });
    describe('when not sucessfull', () => {
      beforeEach(() => clearMocks());

      it('should throw an error when the amount to be withdrawn is less than the balance', async () => {
        accountRepository.getById = jest.fn().mockResolvedValue({
          id: 1,
          email: 'salman@email.com',
          fullName: 'Salman Jaramillo',
          birthDate: '2000-05-03T03:00:00.000Z',
          hashedPassword: 'password',
          balance: 3050.6,
        });

        await expect(
          accountService.withdrawFromAccount({
            id: 1,
            value: 5000,
          }),
        ).rejects.toThrow(new Error('Such amount is not available on account'));
      });

      it('should throw an error when "id" or "value" are not passed as arguments', async () => {
        await expect(
          accountService.depositOnAccount({
            id: 1,
          } as never),
        ).rejects.toThrow(new Error('value must not be less than 1'));

        await expect(
          accountService.depositOnAccount({
            value: 3000.54,
          } as never),
        ).rejects.toThrowError('id should not be empty');
      });

      it('shoul throw an error when account doest not exists', async () => {
        accountRepository.getById = jest.fn().mockResolvedValue(undefined);

        await expect(
          accountService.depositOnAccount({
            id: 1,
            value: 15.54,
          }),
        ).rejects.toThrowError('Account does not exists.');
      });
    });
  });
});
