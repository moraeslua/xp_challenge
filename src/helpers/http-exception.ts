import { HttpStatus } from './';

export class HttpException extends Error {
  status: HttpStatus;

  constructor(message: string, status: HttpStatus) {
    super(message);
    this.status = status;
  }
}
