import { AuthMiddleware } from '../../shared/middlewares/auth'
import BaseRouter from '../../../config/base-router.router'
import { SignController } from '../controllers/sign'
import { SignSharedController } from '../../shared/controllers/sign'

export class SignRouter extends BaseRouter<SignController, AuthMiddleware> {
  constructor (private readonly auxController: SignSharedController = new SignSharedController()) {
    super(SignController, AuthMiddleware)
  }

  public routes (): void {
    this.router.get('/areaManager/sign', (req, res, next) => this.middleware.routePrivate(req, res, next), this.middleware.rolePermission('AM'), async (req, res) => await this.controller.getSigns(req, res))

    this.router.post('/areaManager/sign', (req, res, next) => this.middleware.routePrivate(req, res, next), this.middleware.rolePermission('AM'), async (req, res) => await this.auxController.updateSign(req, res))
  }
}
