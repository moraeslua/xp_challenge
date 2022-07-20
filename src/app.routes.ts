import express from 'express';
import { PrismaClient } from '@prisma/client';
import { AssetModule } from './modules/asset/asset.module';
import { AssetRoutes } from './modules/asset/asset.routes';
import { AccountModule } from './modules/account/account.module';
import { AccountRoutes } from './modules/account/account.routes';
import { InvestmentModule } from './modules/investment/investment.module';
import { InvestmentRoutes } from './modules/investment/investment.routes';
import { AuthModule } from './modules/auth/auth.module';
import { AuthRoutes } from './modules/auth/auth.routes';
import { ValidateAccount } from './middlewares/validate-account';
const prismaClient = new PrismaClient();

const validateAccount = new ValidateAccount();

const assetModule = new AssetModule(prismaClient);
const assetRoutes = new AssetRoutes(assetModule.assetController);

const accountModule = new AccountModule(prismaClient);
const accountRoutes = new AccountRoutes(
  accountModule.accountController,
  validateAccount,
);

const investmentModule = new InvestmentModule(
  prismaClient,
  accountModule.accountRepository,
  assetModule.assetRepository,
);

const investmentRoutes = new InvestmentRoutes(
  investmentModule.investmentController,
  validateAccount,
);

const authModule = new AuthModule(accountModule.accountRepository);
const authRoutes = new AuthRoutes(authModule.authController);

export const appRoutes = express.Router();

appRoutes.use('/asset', assetRoutes.routes);
appRoutes.use('/account', accountRoutes.routes);
appRoutes.use('/investment', investmentRoutes.routes);
appRoutes.use('/auth', authRoutes.routes);
