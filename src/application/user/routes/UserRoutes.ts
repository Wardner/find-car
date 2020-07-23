import { Request, Response, RequestHandler } from 'express';
import { BaseRoutes } from '../../../infrastructure/routes/BaseRoutes';
import { UserController, validators } from '../providers/UserProvider';
import { statusCodes } from '../../../infrastructure/routes/statusCodes';
import { RouteMethod } from '../../../infrastructure/routes/RoutesMethods';
import { ResponseHandler } from '../../../infrastructure/routes/ResponseHandler';
import { verifyRole } from '../../../infrastructure/middleware/VerifyRole';
import { ensureAuth } from '../../../infrastructure/middleware/AuthMiddle';



export class UserRoutes extends BaseRoutes {
  constructor(modulePath: string, private _UserController: UserController){
    super(modulePath);
    this.addRoutes();
  }

  addRoutes() {
    this.api.post('/create', validators.emptyCamps, validators.verifyEmail, this.createUser);
    this.api.post('/login', this.login);
    this.api.put('update/:id', this.updateUser);
    this.api.delete('/delete/:id', this.deleteUser);
    this.api.get('/users', this.getAllUsers);
    this.api.put('/activate/:tokenid', this.changeStatus);
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
        const body = {
          ...req.body,
          cel: req.body.phone
        }
        const user = await this._UserController.create(body);
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

  public login: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async() => {
        const userLogged = await this._UserController.login(req.body);
        if(userLogged)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(userLogged, false))
      }, req, res
    });

  public changeStatus: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async() => {
        let id = req.params?.tokenid.toString();
        let status = true;
        const updated = await this._UserController.activate(id, true);
        if(updated)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(updated, false))
      }, req, res
    });
}

