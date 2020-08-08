import { Router } from 'express'
import { BaseRoutes } from './infrastructure/routes/BaseRoutes'

// Modules
import { userModule } from './application/user/modules/UserModules';
import { vehicleModule } from './application/vehicle/modules/VehicleModule';
import { brandModule } from './application/brand/modules/BrandModule';
import { modelModule } from './application/model/modules/ModelModule';
import { commentModule } from './application/comment/modules/CommentModule';

// Routes
import { UserRoutes } from './application/user/routes/UserRoutes';
import { VehicleRoutes } from './application/vehicle/routes/VehicleRoutes';
import { BrandRoutes } from './application/brand/routes/BrandRoutes';
import { ModelRoutes } from './application/model/routes/ModelRoutes';
import { CommentRoutes } from './application/comment/routes/CommentRoutes';

export class Routes {
  constructor(private router: Router) {
    this.build()
  }

  private addRoutes = (moduleRoutes: BaseRoutes) =>
    this.router.use(moduleRoutes.domain, moduleRoutes.routes)

  private build() {
    this.addRoutes(new UserRoutes('/user', userModule.controller))
    this.addRoutes(new VehicleRoutes('/vehicle', vehicleModule.controller))
    this.addRoutes(new BrandRoutes('/brand', brandModule.controller))
    this.addRoutes(new ModelRoutes('/model', modelModule.controller))
    this.addRoutes(new CommentRoutes('/comment', commentModule.controller))
  }

}
