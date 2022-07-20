export interface ISignUpOutput {
  id: number;
  email: string;
  fullName: string;
  birthDate: Date;
  balance: number;
  token: string;
}

export interface ISignUpInput {
  email: string;
  fullName: string;
  birthDate: Date;
  password: string;
}

export interface ISignInInput {
  email: string;
  password: string;
}

export interface ISignInOutput {
  id: number;
  email: string;
  fullName: string;
  birthDate: Date;
  balance: number;
  token: string;
}

export interface IAuthService {
  signUp(data: ISignUpInput): Promise<ISignUpOutput>;
  signIn(data: ISignInInput): Promise<ISignInOutput>;
}
