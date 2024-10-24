import { AuthMiddleware } from '../../shared/middlewares/auth'
import BaseRouter from '../../../config/base-router.router'
import { RequestController } from '../controllers/request'
import { SharedRequestController } from '../../shared/controllers/request'

export class AdminRoutes extends BaseRouter<RequestController, AuthMiddleware> {
  constructor(
    private readonly controllerTwo: SharedRequestController = new SharedRequestController()
  ) {
    super(RequestController, AuthMiddleware)
  }

  public routes(): void {
    this.router.get('/admin/request', (req, res, next) => this.middleware.routePrivate(req, res, next), this.middleware.rolePermission('A'), async (req, res) => await this.controller.get(req, res))

    this.router.get('/admin/validation', (req, res, next) => this.middleware.routePrivate(req, res, next), this.middleware.rolePermission('A'), async (req, res) => await this.controllerTwo.getValidation(req, res))
  }
}
