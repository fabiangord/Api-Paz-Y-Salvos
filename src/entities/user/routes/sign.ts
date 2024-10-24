import BaseRouter from '../../../config/base-router.router'
import { AuthMiddleware } from '../../shared/middlewares/auth'
import { SignSharedController } from '../../shared/controllers/sign'

export class SignUserRouter extends BaseRouter<SignSharedController, AuthMiddleware> {
  constructor () {
    super(SignSharedController, AuthMiddleware)
  }

  public routes (): void {
    this.router.post('/user/sign', (req, res, next) => this.middleware.routePrivate(req, res, next), this.middleware.rolePermission('U'), async (req, res) => await this.controller.updateSign(req, res))
  }
}
