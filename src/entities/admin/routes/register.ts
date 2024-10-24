import BaseRouter from '../../../config/base-router.router'
import { AuthController } from '../../shared/controllers/auth'
import { AuthMiddleware } from '../../shared/middlewares/auth'

export class RegisterAdmin extends BaseRouter<AuthController, AuthMiddleware> {
  constructor() {
    super(AuthController, AuthMiddleware)
  }

  public routes(): void {
    this.router.post('/admin/register',
      // (req, res, next) => this.middleware.routePrivate(req, res, next),
      // this.middleware.rolePermission('A'),
      async (req, res) => await this.controller.register(req, res))
  }
}
