import { Request, Response } from 'express';
import { HttpStatus } from '../../helpers';
import {
  ISignInRequest,
  ISignUpRequest,
} from './interfaces/auth.controller.interface';
import { IAuthService } from './interfaces/auth.service.interface';

export class AuthController {
  constructor(private authService: IAuthService) {}

  public signUp = async (req: Request, res: Response) => {
    const { email, fullName, birthDate, password } = req.body as ISignUpRequest;
    const response = await this.authService.signUp({
      email,
      fullName,
      birthDate,
      password,
    });
    return res.status(HttpStatus.CREATED).json(response);
  };

  public signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body as ISignInRequest;
    const response = await this.authService.signIn({ email, password });
    return res.status(HttpStatus.OK).json(response);
  };
}
