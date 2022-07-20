import { IAccountRepository } from '../account/interfaces/account.repository.interface';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { IAuthService } from './interfaces/auth.service.interface';

export class AuthModule {
  private authService: IAuthService;
  public authController: AuthController;
  constructor(protected accountRepository: IAccountRepository) {
    this.authService = new AuthService(accountRepository);
    this.authController = new AuthController(this.authService);
  }
}
