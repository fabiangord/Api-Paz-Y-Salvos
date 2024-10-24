import BaseRouter from '../../../config/base-router.router'
import { AuthController } from '../controllers/auth'
import { AuthMiddleware } from '../middlewares/auth'

export class AuthRouter extends BaseRouter<AuthController, AuthMiddleware> {
  constructor() {
    super(AuthController, AuthMiddleware)
  }

  public routes(): void {
    this.router.post('/login', async (req, res) => await this.controller.login(req, res))
    this.router.post('/logout', (req, res) => this.controller.logout(req, res))
    this.router.post('/recovery', async (req, res) => await this.controller.recovery(req, res))
  }
}
