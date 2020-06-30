import { Router } from 'express'
import { BaseRoutes } from './infrastructure/routes/BaseRoutes'

// Modules
import { adminModule } from './application/admin/modules/AdminModules'

// Routes
import { AdminRoutes } from './application/admin/routes/AdminRoutes';

export class Routes {
  constructor(private router: Router) {
    this.build()
  }

  private addRoutes = (moduleRoutes: BaseRoutes) =>
    this.router.use(moduleRoutes.domain, moduleRoutes.routes)

  private build() {
    this.addRoutes(new AdminRoutes('/admin', adminModule.controller))
  }
}