import 'express';

interface IAccountPayload {
  accountId: number;
  email: string;
}

interface Locals {
  account?: IAccountPayload;
}

declare module 'express' {
  export interface Response {
    locals: Locals;
  }
}
