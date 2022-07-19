import { Request, Response } from 'express';
import { AssetService } from './asset.service';
import 'express-async-errors';
import { IGetByAssetRequest } from './interfaces/asset.controller.interface';
import { HttpStatus } from 'src/helpers';
import { IGetAllByAccountInput } from './interfaces/asset.service.interface';

export class AssetController {
  constructor(private assetService: AssetService) {}

  public findById = async (req: Request, res: Response): Promise<Response> => {
    const { id: assetId } = req.params as unknown as IGetByAssetRequest;
    const response = await this.assetService.getById({ id: Number(assetId) });
    return res.status(HttpStatus.OK).json(response);
  };

  public getAllByAccount = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const { accountId } = req.params as unknown as IGetAllByAccountInput;
    const response = await this.assetService.getAllByAccount({
      accountId: Number(accountId),
    });
    return res.status(HttpStatus.OK).json(response);
  };
}
