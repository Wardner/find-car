import { Router } from 'express'
import { BaseRoutes } from './infrastructure/routes/BaseRoutes'

// Modules
import { userModule } from './application/user/modules/UserModules';

// Routes
import { UserRoutes } from './application/user/routes/UserRoutes';

export class Routes {
  constructor(private router: Router) {
    this.build()
  }

  private addRoutes = (moduleRoutes: BaseRoutes) =>
    this.router.use(moduleRoutes.domain, moduleRoutes.routes)

  private build() {
    this.addRoutes(new UserRoutes('/user', userModule.controller))
  }
}