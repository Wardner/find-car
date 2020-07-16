import { Request, Response, RequestHandler } from 'express';
import { BaseRoutes } from '../../../infrastructure/routes/BaseRoutes';
import { VehicleController } from '../providers/VehicleProvider';
import { RouteMethod } from '../../../infrastructure/routes/RoutesMethods';
import { ResponseHandler } from '../../../infrastructure/routes/ResponseHandler';
import { statusCodes } from '../../../infrastructure/routes/statusCodes';
import { ensureAuth } from '../../../infrastructure/middleware/AuthMiddle';

export class VehicleRoutes extends BaseRoutes {
  constructor(modulePath: string, private _VehicleController: VehicleController){
    super(modulePath);
    this.addRoutes();
  }

  addRoutes() {
    this.api.post('/create', ensureAuth, this.createVehicle);
    this.api.get('/vehicles', this.getAllVehicles);
    this.api.get('/vehicle/:id', this.getOneVehicle);
    this.api.put('/update/:id', this.updateVehicle);
    this.api.delete('/delete/:id', this.deleteVehicle);

  }

  public getAllVehicles: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolver: async() => {
        const vehicles = await this._VehicleController.getAll();
        if(vehicles)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(vehicles, false));
      }, req, res
    });

  public getOneVehicle: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolver: async() => {
        let id = Number(req.params.id);
        const vehicle = await this._VehicleController.getById(id);
        if(vehicle)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(vehicle, false));
      }, req, res
    });

  public createVehicle: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async() => {
        console.log(req.body);
        const vehicle = await this._VehicleController.create(req.body);
        if(vehicle)
          return res
            .status(statusCodes.CREATE)
            .send(ResponseHandler.build(vehicle, false))
      }, req, res
    });

  public updateVehicle: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async() => {
        let id = Number(req.params.id);
        const updated = await this._VehicleController.update(id, req.body);
        if(updated)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(updated, false))
      }, req, res
    });

  public deleteVehicle: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async() => {
        let id = Number(req.params.id);
        const deleted = await this._VehicleController.delete(id);
        if(deleted)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(deleted, false))
      }, req, res
    });

}
