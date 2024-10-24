import { prisma } from '../../../config/db'
import { RequestAdminType } from '../../area_manager/types/types'

export class RequestAdmin {
  async getRequest(): Promise<RequestAdminType> {
    return await prisma.requestModel.findMany({
      select: {
        id: true,
        date: true,
        status: true,
        contract: {
          select: {
            NoContract: true
          }
        },
        user: {
          select: {
            document: true,
            Function: {
              select: {
                function: true
              }
            }
          }
        }
      }
    })
  }
}
