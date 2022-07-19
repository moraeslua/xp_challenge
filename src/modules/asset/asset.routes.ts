import express from 'express';
import { AssetController } from './asset.controller';

export class AssetRoutes {
  public routes = express.Router();
  constructor(protected assetController: AssetController) {
    this.routes.get('/:id', assetController.findById);
    this.routes.get('/account/:accountId', assetController.getAllByAccount); // mudar pra /:id
  }
}
