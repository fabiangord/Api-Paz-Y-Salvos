import { RequestModel } from '@prisma/client'
import { prisma } from '../../../config/db'
import { RequestAddFromClient } from '../../user/types/user'
import { Request } from 'express'
import { randomUUID } from 'node:crypto'

export class SharedRequestService {
  async requestAdd(requestFromClient: RequestAddFromClient, id: string, req: Request): Promise<RequestModel> {
    const contract = await prisma.contract.findFirst({
      where: {
        NoContract: requestFromClient.contract
      }
    })

    if (!contract || contract?.userId !== req.user.id) {
      throw new Error('This contract dont exit or dont your contract')
    }

    const newRequest = await prisma.requestModel.create({
      data: {
        id: randomUUID(),
        date: new Date(),
        typeRequest: requestFromClient.typeRequest,
        status: 'PENDIENTE',
        contract: {
          connect: {
            id: contract?.id
          }
        },
        user: {
          connect: {
            id
          }
        }
      },
      include: {
        user: true
      }
    })

    return newRequest
  }

  async findRequest(user: string): Promise<RequestModel[]> {
    return await prisma.requestModel.findMany({
      where: {
        userId: user
      },
      include: {
        contract: {
          select: {
            NoContract: true
          }
        }
      }
    })
  }
}
