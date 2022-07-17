import express from 'express';
import { AssetController } from '../modules/asset/asset.controller';

export class AssetRoutes {
  public routes = express.Router();
  constructor(assetController: AssetController) {
    this.routes.get('/:assetId', assetController.findById);
  }
}
