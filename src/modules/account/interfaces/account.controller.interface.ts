export class ICreateAccountRequest {
  email: string;
  fullName: string;
  birthDate: Date;
  password: string;
}

export class ICreateAccountResponse {
  token: number;
  id: number;
  email: string;
  fullName: string;
  birthDate: Date;
  balance: number;
}

export interface IGetByIdRequest {
  id: number;
}

export interface IGetByIdResponse {
  id: number;
  email: string;
  fullName: string;
  birthDate: Date;
  balance: number;
}

export interface IWithdrawResponse {
  id: number;
  value: number;
}

export interface IWithdrawRequest {
  id: number;
  value: number;
}

export interface IDepositResponse {
  id: number;
  value: number;
}

export interface IDepositRequest {
  id: number;
  value: number;
}

export interface IGetInvestmentsRequest {
  id: number;
}
