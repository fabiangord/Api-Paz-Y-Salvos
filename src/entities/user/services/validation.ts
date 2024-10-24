import { validation } from '@prisma/client'
import { SharedValidation } from '../../shared/services/validation'

export class ValidationService {
  constructor(private readonly service: SharedValidation = new SharedValidation()) { }

  async getValidation(idRequest: string): Promise<validation[] | null> {
    return await this.service.getValidation(idRequest)
  }
}
