import { Request, Response } from 'express';
import { AssetService } from './asset.service';
import 'express-async-errors';
import { IGetByAssetRequest } from './interfaces/asset.controller.interface';
import { HttpStatus } from 'src/helpers';

export class AssetController {
  constructor(private assetService: AssetService) {}

  public getById = async (req: Request, res: Response): Promise<Response> => {
    const { id: assetId } = req.params as unknown as IGetByAssetRequest;
    const response = await this.assetService.getById({ id: Number(assetId) });
    return res.status(HttpStatus.OK).json(response);
  };
}
