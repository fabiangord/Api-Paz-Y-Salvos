
import { AuthMiddleware } from '../../shared/middlewares/auth'
import BaseRouter from '../../../config/base-router.router'
import { DocumentControllerUser } from '../controllers/document'

export class DocumentRoutes extends BaseRouter<DocumentControllerUser, AuthMiddleware> {
  constructor () {
    super(DocumentControllerUser, AuthMiddleware)
  }

  public routes (): void {
    this.router.post('/user/document', (req, res, next) => this.middleware.routePrivate(req, res, next), this.middleware.rolePermission('U'), async (req, res) => await this.controller.createDocument(req, res))
  }
}
