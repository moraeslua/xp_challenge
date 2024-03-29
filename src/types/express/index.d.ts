import 'express';

interface IAccountPayload {
  id: number;
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
