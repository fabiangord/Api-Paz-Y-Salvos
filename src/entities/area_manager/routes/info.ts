import { InfoController } from '../../shared/controllers/user'
import { AuthMiddleware } from '../../shared/middlewares/auth'
import BaseRouter from '../../../config/base-router.router'

export class InfoAMRoutes extends BaseRouter<InfoController, AuthMiddleware> {
  constructor() {
    super(InfoController, AuthMiddleware)
  }

  public routes(): void {
    this.router.get('/areaManager/info', (req, res, next) => this.middleware.routePrivate(req, res, next), this.middleware.rolePermission('AM'), async (req, res) => await this.controller.getInfo(req, res))

    this.router.patch('/areaManager/info', (req, res, next) => this.middleware.routePrivate(req, res, next), this.middleware.rolePermission('AM'), async (req, res) => await this.controller.updateInfo(req, res))
  }
}
