import BaseRouter from '../../../config/base-router.router'
import { SharedRequestController } from '../../shared/controllers/request'
import { AuthMiddleware } from '../../shared/middlewares/auth'

export class UserRequestRouter extends BaseRouter<SharedRequestController, AuthMiddleware> {
  constructor() {
    super(SharedRequestController, AuthMiddleware)
  }

  public routes(): void {
    this.router.get('/user/request', (req, res, next) => this.middleware.routePrivate(req, res, next), this.middleware.rolePermission('U'), async (req, res) => await this.controller.getRequest(req, res))

    this.router.post('/user/request', (req, res, next) => this.middleware.routePrivate(req, res, next), this.middleware.rolePermission('U'), async (req, res) => await this.controller.addRequest(req, res))

    this.router.post('/user/validation', (req, res, next) => this.middleware.routePrivate(req, res, next), this.middleware.rolePermission('U'), async (req, res) => await this.controller.getValidation(req, res))
  }
}
