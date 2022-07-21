import {
  IAuthService,
  ISignInInput,
  ISignInOutput,
  ISignUpInput,
  ISignUpOutput,
} from './interfaces/auth.service.interface';
import bcrypt from 'bcrypt';
import { IAccountRepository } from '../account/interfaces/account.repository.interface';
import { HttpException, HttpStatus } from '../../helpers';
import { generateToken } from '../../helpers/jwt-helpers';
import { AuthValidator } from './validator/auth-validator';

const BCRYPT_ROUNDS = 10;

export class AuthService implements IAuthService {
  constructor(private accountRepository: IAccountRepository) {}
  public async signUp(data: ISignUpInput): Promise<ISignUpOutput> {
    const { email, password, fullName, birthDate } = data;
    await AuthValidator.signUp({ email, password, fullName, birthDate });

    const emailIsInUse = await this.accountRepository.getByEmail({ email });

    if (emailIsInUse) {
      throw new HttpException(
        'This email is already in use',
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);

    const newAccount = await this.accountRepository.create({
      email,
      hashedPassword,
      fullName,
      birthDate: new Date(birthDate),
    });

    delete newAccount.hashedPassword;

    const token = generateToken({ id: newAccount.id, email });

    const dataWithToken = {
      id: newAccount.id,
      email,
      fullName,
      birthDate: newAccount.birthDate,
      balance: newAccount.balance,
      token,
    };

    return dataWithToken;
  }

  public async signIn(data: ISignInInput): Promise<ISignInOutput> {
    const { email, password } = data;
    await AuthValidator.signIn({ email, password });
    const account = await this.accountRepository.getByEmail({ email });
    const passwordMatches = await bcrypt.compare(
      password,
      account.hashedPassword,
    );

    if (!passwordMatches) {
      throw new HttpException(
        'Email or password invalid',
        HttpStatus.UNAUTHORIZED,
      );
    }

    delete account.hashedPassword;

    const token = generateToken({ id: account.id, email });

    const dataWithToken = { ...account, token };
    return dataWithToken;
  }
}
