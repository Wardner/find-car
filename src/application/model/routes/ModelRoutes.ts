import { Request, Response, RequestHandler } from 'express';
import { BaseRoutes } from '../../../infrastructure/routes/BaseRoutes';
import { RouteMethod } from '../../../infrastructure/routes/RoutesMethods';
import { ResponseHandler } from '../../../infrastructure/routes/ResponseHandler';
import { statusCodes } from '../../../infrastructure/routes/statusCodes';
import { ModelController } from '../controllers/ModelController';
import { Model } from 'src/database/entities/Model';

export class ModelRoutes extends BaseRoutes {
  constructor(modulePath: string, private _ModelController: ModelController){
    super(modulePath);
    this.addRoutes();
  }

  addRoutes() {
    this.api.get('/getAll', this.getAllModels);
    this.api.get('/getOne/:id', this.getOneModel);
    this.api.post('/create', this.createModel);
    this.api.put('/update/:id', this.updateModel);
    this.api.delete('/delete/:id', this.deleteModel);
  }

  public getAllModels: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async() => {
        const models = await this._ModelController.getAll();
        if(models)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(models, false));
      }, req, res
    });

  public getOneModel: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async() => {
        let id = Number(req.params.id);
        const model = await this._ModelController.getById(id);
        if(model)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(model, false));
      }, req, res
    });

  public createModel: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async() => {
        const model = await this._ModelController.create(req.body);
        if(model)
          return res
            .status(statusCodes.CREATE)
            .send(ResponseHandler.build(model, false))
      }, req, res
    });

  public updateModel: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async() => {
        let id = Number(req.params.id);
        const updated = await this._ModelController.update(id, req.body);
        if(updated)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(updated, false))
      }, req, res
    }); 

  public deleteModel: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async() => {
        let id = Number(req.params.id);
        const deleted = await this._ModelController.delete(id);
        if(deleted)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(deleted, false))
      }, req, res
    });

}
