import BaseRouter from '../../../config/base-router.router'
import { AuthMiddleware } from '../../shared/middlewares/auth'
import { ContractController } from '../controllers/contract'

export class ContractAdmin extends BaseRouter<ContractController, AuthMiddleware> {
  constructor() {
    super(ContractController, AuthMiddleware)
  }

  public routes(): void {
    this.router.post('/admin/contract', (req, res, next) => this.middleware.routePrivate(req, res, next), this.middleware.rolePermission('A'), async (req, res) => await this.controller.addContract(req, res))
  }
}
