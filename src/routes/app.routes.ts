import { PrismaClient } from '@prisma/client';
import { AssetModule } from '../modules/asset/asset.module';
import { AssetRoutes } from './asset.routes';
import express from 'express';
const prismaClient = new PrismaClient();

const assetModule = new AssetModule(prismaClient);
const assetRoutes = new AssetRoutes(assetModule.assetController);

export const appRoutes = express.Router();

appRoutes.use('/asset', assetRoutes.routes);
