import BaseRouter from '../../../config/base-router.router'
import { InfoController } from '../../shared/controllers/user'
import { AuthMiddleware } from '../../shared/middlewares/auth'

export class InfoRouterAdmin extends BaseRouter<InfoController, AuthMiddleware> {
  constructor() {
    super(InfoController, AuthMiddleware)
  }

  public routes(): void {
    this.router.get('/admin/info/get', (req, res, next) => this.middleware.routePrivate(req, res, next), this.middleware.rolePermission('A'), async (req, res) => await this.controller.getInfo(req, res))

    this.router.patch('/admin/info/update', (req, res, next) => this.middleware.routePrivate(req, res, next), this.middleware.rolePermission('A'), async (req, res) => await this.controller.updateInfo(req, res))
  }
}
