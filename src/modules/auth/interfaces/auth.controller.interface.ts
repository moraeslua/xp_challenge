export interface ISignUpRequest {
  email: string;
  fullName: string;
  birthDate: string;
  password: string;
}

export interface ISignInRequest {
  email: string;
  password: string;
}
