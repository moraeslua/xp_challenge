import { Request, Response } from 'express';
import { AssetService } from './asset.service';
import 'express-async-errors';
import {
  IGetAllRequest,
  IGetByAssetRequest,
} from './interfaces/asset.controller.interface';
import { HttpStatus } from '../../helpers';

const LIMIT_DEFAULT_VALUE = 10;
const OFFSET_DEFAULT_VALUE = 0;

export class AssetController {
  constructor(private assetService: AssetService) {}

  public getById = async (req: Request, res: Response): Promise<Response> => {
    const { id: assetId } = req.params as unknown as IGetByAssetRequest;
    const response = await this.assetService.getById({ id: Number(assetId) });
    return res.status(HttpStatus.OK).json(response);
  };

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const queries = req.query as unknown as IGetAllRequest;

    const limit = Number(queries.limit) || LIMIT_DEFAULT_VALUE;
    const offset = Number(queries.offset) || OFFSET_DEFAULT_VALUE;

    const response = await this.assetService.getAll({ limit, offset });
    return res.status(HttpStatus.OK).json(response);
  };
}
