import { Request, Response, RequestHandler } from 'express';
import { BaseRoutes } from '../../../infrastructure/routes/BaseRoutes';
import { RouteMethod } from '../../../infrastructure/routes/RoutesMethods';
import { ResponseHandler } from '../../../infrastructure/routes/ResponseHandler';
import { statusCodes } from '../../../infrastructure/routes/statusCodes';
import { ensureAuth } from '../../../infrastructure/middleware/AuthMiddle';
import { ReportController } from '../controllers/ReportController';

export class ReportRoutes extends BaseRoutes {
  constructor(modulePath: string, private _ReportController: ReportController){
    super(modulePath);
    this.addRoutes();
  }

  addRoutes() {
    this.api.post('/create/:id', ensureAuth, this.create);
  }

  public create: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async() => 
        this._ReportController.create({
          report_body: req.body.content,
          user: req.user.id,
          owner: req.user.name,
          vehicle: parseInt(req.params.id)
        }).then(report => 
          res
          .status(statusCodes.CREATE)
          .send(ResponseHandler.build(report, false))
        ),
        req,
        res
      })
}