import { validate } from 'class-validator';
import { formatError, HttpException } from '../../../helpers';
import {
  ISignInInput,
  ISignUpInput,
} from '../interfaces/auth.service.interface';
import { SignInSchema, SignUpSchema } from './auth-schemas';

export class AuthValidator {
  private static async execute(inputs: object): Promise<void> {
    const response = await validate(inputs);

    if (response.length) {
      const { message, status } = formatError(response);

      throw new HttpException(message, status);
    }
  }

  static async signUp({
    email,
    birthDate,
    fullName,
    password,
  }: ISignUpInput): Promise<void> {
    const inputs = new SignUpSchema({ email, birthDate, fullName, password });
    await this.execute(inputs);
  }

  static async signIn({ email, password }: ISignInInput): Promise<void> {
    const inputs = new SignInSchema({ email, password });
    await this.execute(inputs);
  }
}
