import express from 'express';
import { AssetController } from './asset.controller';

export class AssetRoutes {
  public routes = express.Router();
  constructor(protected assetController: AssetController) {
    this.routes.get('/:id', assetController.getById);
  }
}
