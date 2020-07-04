import { Request, Response, RequestHandler } from 'express';
import { BaseRoutes } from '../../../infrastructure/routes/BaseRoutes';
import { UserController } from '../providers/UserProvider';
import { statusCodes } from '../../../infrastructure/routes/statusCodes';
import { RouteMethod } from '../../../infrastructure/routes/RoutesMethods';
import { ResponseHandler } from '../../../infrastructure/routes/ResponseHandler';

export class UserRoutes extends BaseRoutes {
  constructor(modulePath: string, private _UserController: UserController){
    super(modulePath);
    this.addRoutes();
  }

  addRoutes() {
    this.api.post('/create', this.createUser);
    this.api.put('update', this.updateUser);
    this.api.delete('/delete', this.deleteUser);
    this.api.get('/users', this.getAllUsers);
  }

  public getAllUsers: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async() => {
        const users = await this._UserController.getAll();
        if(users)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(users, false));
      }, req, res
    });

  public createUser: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async() => {
        const user = await this._UserController.create(req.body);
        if(user)
          return res
            .status(statusCodes.CREATE)
            .send(ResponseHandler.build(user, false))
      }, req, res
    });

  public updateUser: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async() => {
        let id = Number(req.params.id);
        const updated = await this._UserController.update(id, req.body);
        if(updated)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(updated, false))
      }, req, res
    });

  public deleteUser: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async() => {
        let id = Number(req.params.id);
        const deleted = await this._UserController.delete(id);
        if(deleted)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(deleted, false))
      }, req, res
    });
}

