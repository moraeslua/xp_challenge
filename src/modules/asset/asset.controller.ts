import { Request, Response } from 'express';
import { AssetService } from './asset.service';
import { IGetByAssetRequest } from './interfaces/controller/get-by-asset.request';
import 'express-async-errors';

export class AssetController {
  constructor(private assetService: AssetService) {}

  public findById = async (req: Request, res: Response) => {
    const { assetId } = req.params as unknown as IGetByAssetRequest;
    const response = await this.assetService.findById({
      assetId: Number(assetId),
    });
    res.status(200).json(response);
  };
}
