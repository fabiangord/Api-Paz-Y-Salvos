import { User } from '@prisma/client'
import { prisma } from '../../../config/db'
import { GetObjectCommandOutput } from '@aws-sdk/client-s3'
import { SignService } from '../../user/services/sign'

export class AreaManagerUsersService {
  constructor(private readonly service: SignService = new SignService()) { }

  async getAM(): Promise<User[]> {
    return await prisma.user.findMany({
      where: {
        rolId: 'AM'
      },
      include: {
        Function: {
          select: {
            function: true
          }
        }
      }
    })
  }

  async getSigns(id: string): Promise<GetObjectCommandOutput> {
    return await this.service.getSign(id)
  }
}
