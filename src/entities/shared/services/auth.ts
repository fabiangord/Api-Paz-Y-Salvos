import { User } from '@prisma/client'
import { prisma } from '../../../config/db'
import { CredentialsType, UserComplete } from '../types/typesUser'
import { randomUUID } from 'crypto'
import { EncryptService } from './encrypt'
import { Request } from 'express'
import { RegisterValidationService } from './registerValidation'

interface AuthServicesInterface {
  register: (object: UserComplete, req: Request) => Promise<User>
  login: (Uemail: string) => Promise<CredentialsType | null>
}

export class AuthServices implements AuthServicesInterface {
  constructor(
    private readonly encrypt: EncryptService = new EncryptService(),
    private readonly registerValidation: RegisterValidationService = new RegisterValidationService()
  ) { }

  async register(uDataUser: UserComplete): Promise<User> {
    await this.registerValidation.email(uDataUser.email)

    const data = await this.registerValidation.call(uDataUser)

    return await prisma.user.create({
      data: {
        id: randomUUID(),
        documentTypeId: data.document.id,
        rolId: data.rol.id,
        Credentials: {
          create: {
            id: randomUUID(),
            email: uDataUser.email,
            password: await this.encrypt.hash(uDataUser.password)
          }
        },
        name: uDataUser.name,
        lastname: uDataUser.lastname,
        document: uDataUser.document,
        cellphone: uDataUser.cellphone,
        city: uDataUser.city,
        rhId: data.rh.id,
        genderId: data.gender.id,
        siteId: data.site.id,
        functionId: data.functionU.id
      }

    })
  }

  async login(uEmail: string): Promise<CredentialsType | null> {
    return await prisma.credentials.findUnique({
      where: {
        email: uEmail
      },
      include: {
        user: true
      }
    })
  }
}
