import { ValidationError } from 'class-validator';
import { HttpStatus } from './http-status';

export const formatError = (validation: ValidationError[]) => {
  const { constraints } = validation[0];
  const entries = Object.entries(constraints);
  const firstErrIndex = entries.length - 1;

  // const errorType = entries[firstErrIndex][0] as string;
  const message: string = entries[firstErrIndex][1];

  return { status: HttpStatus.BAD_REQUEST, message };
};
