import { Prisma, RequestModel, validation } from '@prisma/client'
import { prisma } from '../../../config/db'
import { FindRequest } from '../../user/types/interfaces'
import { aproveValidationTypeStatus } from '../types/types'
import { SharedValidation } from '../../shared/services/validation'

interface RequestServiceAMInterface {
  validation: (id: string, idRequest: string, commentary: string, status: aproveValidationTypeStatus) => Promise<Prisma.BatchPayload | null>
}

export class RequestServiceAM implements FindRequest, RequestServiceAMInterface {
  constructor(private readonly service: SharedValidation = new SharedValidation()) { }

  async findRequest(id: string): Promise<RequestModel[]> {
    return await prisma.requestModel.findMany({
      where: {
        validation: {
          some: {
            areaManagerId: id
          }
        }
      },
      include: {
        user: true
      }
    })
  }

  async validation(id: string, idRequest: string, commentary: string, status: aproveValidationTypeStatus): Promise<Prisma.BatchPayload> {
    if (status === 'RECHAZADO') {
      await prisma.requestModel.update({
        where: {
          id: idRequest
        },
        data: {
          status
        }
      })
    }

    const validationFind = await prisma.validation.updateMany({
      where: {
        areaManagerId: id,
        requestId: idRequest
      },
      data: {
        commentary,
        status,
        dateSign: new Date().toISOString()
      }
    })

    console.log(validationFind)

    const totalValidations = await prisma.validation.count({
      where: {
        requestId: idRequest
      }
    })

    const approvedValidations = await prisma.validation.count({
      where: {
        requestId: idRequest,
        status: 'APROBADO'
      }
    })

    if (totalValidations === approvedValidations) {
      await prisma.requestModel.update({
        where: {
          id: idRequest
        },
        data: {
          status
        }
      })
    }

    return validationFind
  }

  async getValidation(idRequest: string): Promise<validation[] | null> {
    return await this.service.getValidation(idRequest)
  }
}
