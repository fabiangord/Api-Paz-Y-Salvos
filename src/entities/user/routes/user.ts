import BaseRouter from '../../../config/base-router.router'
import { AuthMiddleware } from '../../shared/middlewares/auth'
import { InfoController } from '../../shared/controllers/user'

export class UserInfoRouter extends BaseRouter<InfoController, AuthMiddleware> {
  constructor () {
    super(InfoController, AuthMiddleware)
  }

  public routes (): void {
    this.router.get('/user/info', (req, res, next) => this.middleware.routePrivate(req, res, next), this.middleware.rolePermission('U'), async (req, res) => await this.controller.getInfo(req, res))

    this.router.patch('/user/info', (req, res, next) => this.middleware.routePrivate(req, res, next), this.middleware.rolePermission('U'), async (req, res) => await this.controller.updateInfo(req, res))
  }
}
