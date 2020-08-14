import { Request, Response, RequestHandler } from 'express';
import { BaseRoutes } from '../../../infrastructure/routes/BaseRoutes';
import { RouteMethod } from '../../../infrastructure/routes/RoutesMethods';
import { ResponseHandler } from '../../../infrastructure/routes/ResponseHandler';
import { statusCodes } from '../../../infrastructure/routes/statusCodes';
import { ensureAuth } from '../../../infrastructure/middleware/AuthMiddle';
import { CommentController } from '../controllers/CommentController';

export class CommentRoutes extends BaseRoutes {
  constructor(modulePath: string, private _CommentController: CommentController){
    super(modulePath);
    this.addRoutes();
  }

  addRoutes() {
    this.api.post('/create/:id', ensureAuth, this.create);
    this.api.delete('/delete/:id', ensureAuth, this.delete);
  }

  public create: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async() => 
        this._CommentController.create({
          comment_body: req.body.content,
          user: req.user.id,
          owner: req.user.name,
          email: req.user.email,
          cel: req.user.cel,
          vehicle: parseInt(req.params.id)
        }).then(comment => 
          res
          .status(statusCodes.CREATE)
          .send(ResponseHandler.build(comment, false))
        ),
        req,
        res
      })

  public delete: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async() => {
        let id = Number(req.params.id);
        if(req.body.user = req.user.id){
          const deleted = await this._CommentController.delete(id);
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
      
}

