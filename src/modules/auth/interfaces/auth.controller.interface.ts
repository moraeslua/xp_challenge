export interface ISignUpRequest {
  email: string;
  fullName: string;
  birthDate: Date;
  password: string;
}

export interface ISignInRequest {
  email: string;
  password: string;
}
