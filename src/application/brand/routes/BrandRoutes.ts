import { Request, Response, RequestHandler } from 'express';
import { BaseRoutes } from '../../../infrastructure/routes/BaseRoutes';
import { RouteMethod } from '../../../infrastructure/routes/RoutesMethods';
import { ResponseHandler } from '../../../infrastructure/routes/ResponseHandler';
import { statusCodes } from '../../../infrastructure/routes/statusCodes';
import { Brand, BrandController } from '../providers/BrandProvider';

export class BrandRoutes extends BaseRoutes {
  constructor(modulePath: string, private _BrandController: BrandController){
    super(modulePath);
    this.addRoutes();
  }

  addRoutes() {
    this.api.get('/getAll', this.getAllBrands);
    this.api.get('/getOne/:id', this.getOneBrand);
    this.api.post('/create', this.createBrand);
    this.api.put('/update/:id', this.updateBrand);
    this.api.delete('/delete/:id', this.deleteBrand);
  }

  public getAllBrands: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async() => {
        const brands = await this._BrandController.getAll();
        if(brands)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(brands, false));
      }, req, res
    });

  public getOneBrand: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async() => {
        let id = Number(req.params.id);
        const brand = await this._BrandController.getById(id);
        if(brand)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(brand, false));
      }, req, res
    });

  public createBrand: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async() => {
        const brand = await this._BrandController.create(req.body);
        if(brand)
          return res
            .status(statusCodes.CREATE)
            .send(ResponseHandler.build(brand, false))
      }, req, res
    });

  public updateBrand: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async() => {
        let id = Number(req.params.id);
        const updated = await this._BrandController.update(id, req.body);
        if(updated)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(updated, false))
      }, req, res
    });    

  public deleteBrand: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async() => {
        let id = Number(req.params.id);
        const deleted = await this._BrandController.delete(id);
        if(deleted)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(deleted, false))
      }, req, res
    });
}

