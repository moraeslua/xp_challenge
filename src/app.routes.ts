import express from 'express';
import { PrismaClient } from '@prisma/client';
import { AssetModule } from './modules/asset/asset.module';
import { AssetRoutes } from './modules/asset/asset.routes';
import { AccountModule } from './modules/account/account.module';
import { AccountRoutes } from './modules/account/account.routes';
import { InvestmentModule } from './modules/investment/investment.module';
import { InvestmentRoutes } from './modules/investment/investment.routes';
const prismaClient = new PrismaClient();

const assetModule = new AssetModule(prismaClient);
const assetRoutes = new AssetRoutes(assetModule.assetController);

const accountModule = new AccountModule(prismaClient);
const accountRoutes = new AccountRoutes(accountModule.accountController);

const investmentModule = new InvestmentModule(
  prismaClient,
  accountModule.accountRepository,
  assetModule.assetRepository,
);

const investmentRoutes = new InvestmentRoutes(
  investmentModule.investmentController,
);

export const appRoutes = express.Router();

appRoutes.use('/asset', assetRoutes.routes);
appRoutes.use('/account', accountRoutes.routes);
appRoutes.use('/investment', investmentRoutes.routes);
