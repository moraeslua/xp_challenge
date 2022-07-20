import { AccountRepositoryMock } from '../../__mocks__/account/account.repository.mock';
import { AssetRepositoryMock } from '../../__mocks__/asset/asset.repository.mock';
import { InvestmentRepositoryMock } from '../../__mocks__/investment/investment.repository.mock';
import { InvestmentService } from './investment.service';

const assetRepositoryMock = new AssetRepositoryMock();
const accountRepositoryMock = new AccountRepositoryMock();
const investmentRepositoryMock = new InvestmentRepositoryMock();

const investmentService = new InvestmentService(
  investmentRepositoryMock,
  assetRepositoryMock,
  accountRepositoryMock,
);

describe('Investment Service tests', () => {
  describe('"buy stock" method', () => {
    describe('when sucessfull', () => {
      const assetFindByIdMock = jest.fn().mockResolvedValue({
        id: 12,
        symbol: 'PETR3.SA',
        companyName: 'Petróleo Brasileiro S.A. - Petrobras',
        price: 30.31,
        exchange: 'São Paulo',
        exchangeShortName: 'EURONEXT',
        amount: 58,
      });

      const accountGetByIdMock = jest.fn().mockResolvedValue({
        id: 1,
        email: 'salman@email.com',
        fullName: 'Salman Jaramillo',
        birthDate: '2000-05-03 03:00:00',
        hashedPassword: 'password',
        balance: 2989.98,
      });

      const investmentFindByIdMock = jest
        .fn()
        .mockResolvedValue({ accountId: 1, assetId: 12, amount: 2 });

      const upsertTransactionMock = jest.fn().mockResolvedValue({
        id: 6,
        accountId: 1,
        assetId: 12,
        price: 30.31,
        amount: 2,
        type: 'BUY',
        createdAt: '2022-07-20T17:41:09.211Z',
      });

      it('should call repository with correct arguments', async () => {
        assetRepositoryMock.findById = assetFindByIdMock;
        accountRepositoryMock.getById = accountGetByIdMock;
        investmentRepositoryMock.findById = investmentFindByIdMock;
        investmentRepositoryMock.upsertInvestmentTransaction =
          upsertTransactionMock;

        const result = await investmentService.buyStock({
          accountId: 1,
          assetId: 12,
          amount: 2,
        });

        expect(assetRepositoryMock.findById).toBeCalledTimes(1);
        expect(accountRepositoryMock.getById).toBeCalledTimes(1);
        expect(investmentRepositoryMock.findById).toBeCalledTimes(1);
        expect(
          investmentRepositoryMock.upsertInvestmentTransaction,
        ).toHaveBeenCalledTimes(1);

        expect(assetRepositoryMock.findById).toHaveBeenCalledWith({ id: 12 });
        expect(accountRepositoryMock.getById).toHaveBeenCalledWith({ id: 1 });
        expect(investmentRepositoryMock.findById).toHaveBeenCalledWith({
          accountId: 1,
          assetId: 12,
        });

        expect(
          investmentRepositoryMock.upsertInvestmentTransaction,
        ).toHaveBeenCalledWith({
          accountId: 1,
          amount: 2,
          assetId: 12,
          price: 30.31,
          type: 'BUY',
          assetAmount: 56,
          accountBalance: 2929.36,
          totalAmountInvestedbyAccount: 4,
          shouldRemoveInvestment: false,
        });

        expect(result).toBeDefined();
      });

      it('should return an object with correct properties and values', async () => {
        assetRepositoryMock.findById = assetFindByIdMock;
        accountRepositoryMock.getById = accountGetByIdMock;
        investmentRepositoryMock.findById = investmentFindByIdMock;
        investmentRepositoryMock.upsertInvestmentTransaction =
          upsertTransactionMock;

        const result = await investmentService.buyStock({
          accountId: 1,
          assetId: 12,
          amount: 2,
        });

        expect(result).toHaveProperty('id', 6);
        expect(result).toHaveProperty('accountId', 1);
        expect(result).toHaveProperty('assetId', 12);
        expect(result).toHaveProperty('price', 30.31);
        expect(result).toHaveProperty('amount', 2);
        expect(result).toHaveProperty('type', 'BUY');
        expect(result).toHaveProperty('createdAt', '2022-07-20T17:41:09.211Z');
      });
    });
    describe('when not sucessfull', () => {
      it('should throw an error when "assetId", "accountId" or "amount" are not passed as arguments', async () => {
        await expect(
          investmentService.buyStock({
            accountId: 1,
            amount: 2,
          } as never),
        ).rejects.toThrow(new Error('assetId should not be empty'));

        await expect(
          investmentService.buyStock({
            accountId: 1,
            assetId: 12,
          } as never),
        ).rejects.toThrow(new Error('amount should not be empty'));

        await expect(
          investmentService.buyStock({
            assetId: 12,
            amount: 2,
          } as never),
        ).rejects.toThrow(new Error('accountId should not be empty'));
      });

      it('should throw an error when asset does not exists', async () => {
        assetRepositoryMock.findById = jest.fn().mockResolvedValue(undefined);

        await expect(
          investmentService.buyStock({
            assetId: 125,
            accountId: 1,
            amount: 2,
          }),
        ).rejects.toThrow(new Error('Asset does not exists.'));
      });
      it('should throw an error when account does not exists', async () => {
        assetRepositoryMock.findById = jest.fn().mockResolvedValue({
          id: 12,
          symbol: 'PETR3.SA',
          companyName: 'Petróleo Brasileiro S.A. - Petrobras',
          price: 30.31,
          exchange: 'São Paulo',
          exchangeShortName: 'EURONEXT',
          amount: 58,
        });

        accountRepositoryMock.getById = jest.fn().mockResolvedValue(undefined);

        await expect(
          investmentService.buyStock({
            assetId: 12,
            accountId: 125,
            amount: 2,
          }),
        ).rejects.toThrow(new Error('Account does not exists.'));
        //
      });
    });
  });
  describe('"sell stock" method', () => {
    describe('when sucessfull', () => {
      const investmentFindByIdMock = jest.fn().mockResolvedValue({
        accountId: 1,
        assetId: 12,
        amount: 4,
      });

      const assetFindByIdMock = jest.fn().mockResolvedValue({
        id: 12,
        symbol: 'PETR3.SA',
        companyName: 'Petróleo Brasileiro S.A. - Petrobras',
        price: 30.31,
        exchange: 'São Paulo',
        exchangeShortName: 'EURONEXT',
        amount: 101,
      });

      const accountGetByIdMock = jest.fn().mockResolvedValue({
        id: 1,
        email: 'salman@email.com',
        fullName: 'Salman Jaramillo',
        birthDate: '2000-05-03T03:00:00.000Z',
        hashedPassword: 'password',
        balance: 2929.36,
      });

      const upsertTransactionMock = jest.fn().mockResolvedValue({
        id: 7,
        accountId: 1,
        assetId: 12,
        price: 30.31,
        amount: 2,
        type: 'SELL',
        createdAt: '2022-07-20T19:29:16.728Z',
      });

      it('should call repository with correct arguments', async () => {
        investmentRepositoryMock.findById = investmentFindByIdMock;
        assetRepositoryMock.findById = assetFindByIdMock;
        accountRepositoryMock.getById = accountGetByIdMock;
        investmentRepositoryMock.upsertInvestmentTransaction =
          upsertTransactionMock;

        const result = await investmentService.sellStock({
          accountId: 1,
          assetId: 12,
          amount: 2,
        });

        expect(investmentRepositoryMock.findById).toBeCalledTimes(1);
        expect(assetRepositoryMock.findById).toBeCalledTimes(1);
        expect(accountRepositoryMock.getById).toBeCalledTimes(1);
        expect(
          investmentRepositoryMock.upsertInvestmentTransaction,
        ).toHaveBeenCalledTimes(1);

        expect(investmentRepositoryMock.findById).toHaveBeenNthCalledWith(1, {
          accountId: 1,
          assetId: 12,
        });
        expect(assetRepositoryMock.findById).toHaveBeenNthCalledWith(1, {
          id: 12,
        });

        expect(accountRepositoryMock.getById).toHaveBeenNthCalledWith(1, {
          id: 1,
        });

        expect(
          investmentRepositoryMock.upsertInvestmentTransaction,
        ).toHaveBeenNthCalledWith(1, {
          accountId: 1,
          assetId: 12,
          amount: 2,
          price: 30.31,
          type: 'SELL',
          assetAmount: 103,
          accountBalance: 2989.98,
          totalAmountInvestedbyAccount: 2,
          shouldRemoveInvestment: false,
        });

        expect(result).toBeDefined();
      });

      it('should return an object with correct properties and values', async () => {
        const result = await investmentService.sellStock({
          accountId: 1,
          assetId: 12,
          amount: 2,
        });
        //
        expect(result).toHaveProperty('id', 7);
        expect(result).toHaveProperty('accountId', 1);
        expect(result).toHaveProperty('assetId', 12);
        expect(result).toHaveProperty('price', 30.31);
        expect(result).toHaveProperty('amount', 2);
        expect(result).toHaveProperty('type', 'SELL');
        expect(result).toHaveProperty('createdAt', '2022-07-20T19:29:16.728Z');
      });
    });
    describe('when not sucessfull', () => {
      it('should throw an error when "assetId", "accountId" or "amount" are not passed as arguments', async () => {
        await expect(
          investmentService.sellStock({
            accountId: 1,
            amount: 2,
          } as never),
        ).rejects.toThrow(new Error('assetId should not be empty'));

        await expect(
          investmentService.sellStock({
            accountId: 1,
            assetId: 12,
          } as never),
        ).rejects.toThrow(new Error('amount should not be empty'));

        await expect(
          investmentService.sellStock({
            assetId: 12,
            amount: 2,
          } as never),
        ).rejects.toThrow(new Error('accountId should not be empty'));
      });

      it('should throw an error when investment doest not exists.', async () => {
        investmentRepositoryMock.findById = jest
          .fn()
          .mockResolvedValue(undefined);

        await expect(
          investmentService.sellStock({
            accountId: 1,
            assetId: 125,
            amount: 2,
          }),
        ).rejects.toThrow(
          new Error('Account does not have investment on this asset'),
        );
      });

      it('should throw an error when the account wants sell more assets than it has', async () => {
        investmentRepositoryMock.findById = jest.fn().mockResolvedValue({
          accountId: 1,
          assetId: 12,
          amount: 4,
        });

        assetRepositoryMock.findById = jest.fn().mockResolvedValue({
          id: 12,
          symbol: 'PETR3.SA',
          companyName: 'Petróleo Brasileiro S.A. - Petrobras',
          price: 30.31,
          exchange: 'São Paulo',
          exchangeShortName: 'EURONEXT',
          amount: 101,
        });

        accountRepositoryMock.getById = jest.fn().mockResolvedValue({
          id: 1,
          email: 'salman@email.com',
          fullName: 'Salman Jaramillo',
          birthDate: '2000-05-03T03:00:00.000Z',
          hashedPassword: 'password',
          balance: 2929.36,
        });

        investmentRepositoryMock.upsertInvestmentTransaction = jest
          .fn()
          .mockResolvedValue({
            id: 7,
            accountId: 1,
            assetId: 12,
            price: 30.31,
            amount: 2,
            type: 'SELL',
            createdAt: '2022-07-20T19:29:16.728Z',
          });

        await expect(
          investmentService.sellStock({
            accountId: 1,
            assetId: 12,
            amount: 15,
          }),
        ).rejects.toThrow(new Error('Such amount not available to sell'));
      });
    });
  });
});
