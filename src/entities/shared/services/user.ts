import { prisma } from '../../../config/db'
import { User } from '@prisma/client'
import { UpdateUserFromClient } from '../../user/types/user'

interface InfoServiceInterface {
  getInfoUser: (id: string) => Promise<UpdateUserFromClient | string>
  UpdateInfoUser: (update: UpdateUserFromClient, idUser: string) => Promise<Partial<User>>
}

export class UserInfoService implements InfoServiceInterface {
  async getInfoUser (id: string): Promise<UpdateUserFromClient> {
    const info = await prisma.user.findFirst({
      where: {
        id
      },
      select: {
        name: true,
        lastname: true,
        cellphone: true,
        Site: {
          select: {
            site: true
          }
        },
        city: true
      }
    })

    if (info === null) throw new Error('user not found')

    return info
  }

  async UpdateInfoUser (update: UpdateUserFromClient, idUser: string): Promise<Partial<User>> {
    const info = await prisma.user.update({
      where: {
        id: idUser
      },
      data: {
        name: update.name,
        lastname: update.lastname,
        cellphone: update.cellphone,
        city: update.city
      },
      select: {
        name: true,
        lastname: true,
        cellphone: true,
        city: true
      }
    })

    return info
  }
}
