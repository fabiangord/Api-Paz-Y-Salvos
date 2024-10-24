import BaseRouter from '../../../config/base-router.router'
import { SharedRequestController } from '../../shared/controllers/request'
import { AuthMiddleware } from '../../shared/middlewares/auth'
import { RequestController } from '../controllers/request'

export class RequestAreaMRouter extends BaseRouter<SharedRequestController, AuthMiddleware> {
  constructor(
    private readonly controllerTwo: RequestController = new RequestController()
  ) {
    super(SharedRequestController, AuthMiddleware)
  }

  public routes(): void {
    this.router.get('/areaManager/request', (req, res, next) => this.middleware.routePrivate(req, res, next), this.middleware.rolePermission('AM'), async (req, res) => await this.controllerTwo.getRequest(req, res))

    this.router.post('/areaManager/request', (req, res, next) => this.middleware.routePrivate(req, res, next), this.middleware.rolePermission('AM'), async (req, res) => await this.controller.addRequest(req, res))

    this.router.get('/areaManager/validation', (req, res, next) => this.middleware.routePrivate(req, res, next), this.middleware.rolePermission('AM'), async (req, res) => await this.controllerTwo.getValidation(req, res))

    this.router.post('/areaManager/validation', (req, res, next) => this.middleware.routePrivate(req, res, next), this.middleware.rolePermission('AM'), async (req, res) => await this.controllerTwo.validation(req, res))
  }
}
