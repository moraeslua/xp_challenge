import { AccountRepositoryMock } from '../../__mocks__/account/account.repository.mock';
import { AuthService } from './auth.service';
import { IAuthService } from './interfaces/auth.service.interface';
import * as jwtHelpers from '../../helpers/jwt-helpers';
import bcrypt from 'bcrypt';
jest.mock('../../helpers/jwt-helpers');
jest.mock('bcrypt');

let accountRepositoryMock: AccountRepositoryMock;
let authService: IAuthService;

const clearMocks = () => {
  jest.clearAllMocks();
  accountRepositoryMock = new AccountRepositoryMock();
  authService = new AuthService(accountRepositoryMock);
};

describe('Auth Service tests', () => {
  describe('"sign up" method', () => {
    describe('when sucessfull', () => {
      const accountGetByEmailMock = jest.fn().mockResolvedValue(null);
      const accountCreateMock = jest.fn().mockResolvedValue({
        id: 4,
        email: 'rocco@email.com',
        fullName: 'Rocco Anderson',
        birthDate: '2000-03-05T03:00:00.000Z',
        hashedPassword: 'hashedPassword',
        balance: 0,
      });

      beforeEach(() => {
        clearMocks();
        accountRepositoryMock.getByEmail = accountGetByEmailMock;
        accountRepositoryMock.create = accountCreateMock;
        jest.spyOn(jwtHelpers, 'generateToken').mockReturnValue('token');
        jest
          .spyOn(bcrypt, 'hash')
          .mockImplementation(() => Promise.resolve('hashedPassword'));
      });

      it('should call repository with correct arguments', async () => {
        const result = await authService.signUp({
          email: 'rocco@email.com',
          fullName: 'Rocco Anderson',
          birthDate: '03/05/2000',
          password: 'password',
        });

        expect(accountRepositoryMock.getByEmail).toHaveBeenNthCalledWith(1, {
          email: 'rocco@email.com',
        });
        expect(accountRepositoryMock.create).toHaveBeenNthCalledWith(1, {
          email: 'rocco@email.com',
          hashedPassword: 'hashedPassword',
          fullName: 'Rocco Anderson',
          birthDate: new Date('2000-03-05T03:00:00.000Z'),
        });

        expect(result).toBeDefined();
      });

      it('should return an object with correct properties and values', async () => {
        const result = await authService.signUp({
          email: 'rocco@email.com',
          fullName: 'Rocco Anderson',
          birthDate: '03/05/2000',
          password: 'password',
        });

        expect(result).toEqual(
          expect.objectContaining({
            id: 4,
            email: 'rocco@email.com',
            fullName: 'Rocco Anderson',
            birthDate: '2000-03-05T03:00:00.000Z',
            balance: 0,
            token: 'token',
          }),
        );

        expect(result).not.toHaveProperty('hashedPassword');
        expect(result).not.toHaveProperty('password');
      });
    });

    describe('when not sucessfull', () => {
      beforeEach(() => clearMocks());
      it('should throw an error when email is already in use', async () => {
        jest
          .spyOn(accountRepositoryMock, 'getByEmail')
          .mockResolvedValue('rocco@email.com');

        await expect(
          authService.signUp({
            email: 'rocco@email.com',
            fullName: 'Rocco Anderson',
            birthDate: '03/05/2000',
            password: 'password',
          }),
        ).rejects.toThrow(new Error('This email is already in use'));
      });

      it('should throw an error when email format is invalid', async () => {
        await expect(
          authService.signUp({
            email: 'roccoemail.com',
            fullName: 'Rocco Anderson',
            birthDate: '03/05/2000',
            password: 'password',
          }),
        ).rejects.toThrow(new Error('email must be an email'));

        await expect(
          authService.signUp({
            email: 'rocco@emailcom',
            fullName: 'Rocco Anderson',
            birthDate: '03/05/2000',
            password: 'password',
          }),
        ).rejects.toThrow(new Error('email must be an email'));
      });

      it('should throw an error when "email", "password", "birthDate" or "fullName" are not passed as arguments', async () => {
        await expect(
          authService.signUp({
            fullName: 'Rocco Anderson',
            birthDate: '03/05/2000',
            password: 'password',
          } as never),
        ).rejects.toThrow(new Error('email should not be empty'));

        await expect(
          authService.signUp({
            email: 'rocco@email.com',
            birthDate: '03/05/2000',
            password: 'password',
          } as never),
        ).rejects.toThrow(new Error('fullName should not be empty'));

        await expect(
          authService.signUp({
            email: 'rocco@email.com',
            fullName: 'Rocco Anderson',
            password: 'password',
          } as never),
        ).rejects.toThrow(new Error('birthDate should not be empty'));

        await expect(
          authService.signUp({
            email: 'rocco@email.com',
            fullName: 'Rocco Anderson',
            birthDate: '03/05/2000',
          } as never),
        ).rejects.toThrow(new Error('password should not be empty'));
      });
    });
  });
});
