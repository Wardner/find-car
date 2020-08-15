import { Request, Response, RequestHandler } from 'express';
import { BaseRoutes } from '../../../infrastructure/routes/BaseRoutes';
import { VehicleController } from '../providers/VehicleProvider';
import { RouteMethod } from '../../../infrastructure/routes/RoutesMethods';
import { ResponseHandler } from '../../../infrastructure/routes/ResponseHandler';
import { statusCodes } from '../../../infrastructure/routes/statusCodes';
import { ensureAuth } from '../../../infrastructure/middleware/AuthMiddle';
import { vehiclePictureMiddle } from '../../../infrastructure/middleware/uploads/VehiclePicture';
import { validators } from '../utils/VehicleValidators';
import path from 'path';
import fs from 'fs';

export class VehicleRoutes extends BaseRoutes {
  constructor(modulePath: string, private _VehicleController: VehicleController){
    super(modulePath);
    this.addRoutes();
  }

  addRoutes() {
    this.api.post('/create', [ensureAuth, vehiclePictureMiddle], this.createVehicle);
    this.api.get('/getall', this.getAllVehicles);
    this.api.get('/getone/:id', this.getOneVehicle);
    this.api.put('/update/:id', ensureAuth, this.updateVehicle);
    this.api.delete('/delete/:id', ensureAuth, this.deleteVehicle);
    
    // Upload Picture
    this.api.put('/upload/:id', [ensureAuth, vehiclePictureMiddle], this.upload)
    this.api.get('/picture/:filename', this.getImg)
    //  this.api.post('/verify-email-code', validators.verifyEmailWithCode, this.verifyEmailWithCode)

  }

  public getAllVehicles: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async() => {
        const vehicles = await this._VehicleController.getAll();
        if(vehicles)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(vehicles, false));
      }, req, res
    });

  public getOneVehicle: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async() => {
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
        if(req.files){
          let files = req.files as any;

          let pictures = files
            .map(file => "https://fcar.herokuapp.com/vehicle/picture/"+file.filename)
            
          const vehicle = await this._VehicleController
            .create({userId: req.user.id, picture: pictures, ...req.body});
            
          if(vehicle)
            return res
              .status(statusCodes.CREATE)
              .send(ResponseHandler.build(vehicle, false))
        } else {
          const vehicle = await this._VehicleController
            .create({userId: req.user.id, picture: null, ...req.body});
          console.log('object');
          if(vehicle)
            return res
              .status(statusCodes.CREATE)
              .send(ResponseHandler.build(vehicle, false))
        }
      }, req, res
    });

  public updateVehicle: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async() => {
        let id = Number(req.params.id);
        if(req.body.user = req.user.id){
          const updated = await this._VehicleController.update(id, req.body);
          if(updated)
            return res
              .status(statusCodes.OK)
              .send(ResponseHandler.build(updated, false))
        } else {
          return res
            .status(statusCodes.UNAUTHORIZED)
            .send(ResponseHandler.build('UNAUTHORIZED', true))
        }
      }, req, res
    });

  public deleteVehicle: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async() => {
        let id = Number(req.params.id);
        if(req.body.user = req.user.id){
          const deleted = await this._VehicleController.delete(id);
          if(deleted)
            return res
              .status(statusCodes.OK)
              .send(ResponseHandler.build(deleted, false))
        } else {
          return res
            .status(statusCodes.UNAUTHORIZED)
            .send(ResponseHandler.build('UNAUTHORIZED', true))
        }
      }, req, res
    });

  public upload: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () => {
        let files = req.files as any;

        if (!req.files)
          throw Error("BAD REQUEST, INVALID FILE")

        const uploaded = await this._VehicleController.upload({
          id: parseInt(req.params.id),
          picture: files.map(file => "https://fcar.herokuapp.com/vehicle/picture/"+file.filename)
        })
        if(uploaded)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(uploaded, false))
      }, req, res
    })

  public getImg: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () => {
        try {
          const name: string = req.params.filename;
          const picture = path.resolve(__dirname, `../../../../../uploads/${name}`)
          if(fs.existsSync(picture))
            res.sendFile(path.resolve(picture))
          else {
            return res
              .status(statusCodes.NOT_FOUND)
              .send(ResponseHandler.build('No se hallo la imagen', true))
          }
        } catch(e){
          return res
            .status(statusCodes.INTERNAL_ERROR)
            .send(ResponseHandler.build(e.message, true))
        }
      }, req, res
    })

}