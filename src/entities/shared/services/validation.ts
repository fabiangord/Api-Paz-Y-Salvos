import { Prisma, User, validation } from '@prisma/client'
import { prisma } from '../../../config/db'
import { randomUUID } from 'node:crypto'

export class SharedValidation {
  async findAreaManager(): Promise<User[]> {
    return await prisma.user.findMany({
      where: {
        rolId: 'AM'
      }
    })
  }

  async createValidation(areaManagers: User[], requestId: string): Promise<Prisma.BatchPayload> {
    return await prisma.validation.createMany({
      data: areaManagers.map(user => ({
        id: randomUUID(),
        commentary: '',
        status: 'PENDIENTE',
        requestId,
        areaManagerId: user.id
      }))
    })
  }

  async getValidation(idRequest: string): Promise<validation[] | null> {
    return await prisma.validation.findMany({
      where: {
        requestId: idRequest
      },
      include: {
        areaManager: {
          select: {
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
