import { Credentials, DocumentType, Function, Gender, RH, Rol, Site, enumDocumentType, enumGender, enumRH, enumRol } from '@prisma/client'
import { prisma } from '../../../config/db'
import { RegisterValidationType, UserComplete } from '../types/typesUser'

export class RegisterValidationService {
  async email(emailUser: string): Promise<Credentials | null> {
    const email = await prisma.credentials.findUnique({
      where: {
        email: emailUser
      }
    })

    if (email !== null) {
      throw new Error('User registrado')
    }

    return email
  }

  async documentType(uDataUser: enumDocumentType): Promise<DocumentType> {
    const documentType = await prisma.documentType.findFirst({
      where: {
        type: uDataUser
      }
    })

    if (documentType === null) {
      throw new Error('Tipo de documento no existe')
    }

    return documentType
  }

  async rol(rolUser: enumRol): Promise<Rol> {
    const rol = await prisma.rol.findFirst({
      where: {
        rol: rolUser
      }
    })

    if (rol === null) {
      throw new Error('Rol no existe')
    }

    return rol
  }

  async rh(rhUser: enumRH): Promise<RH> {
    const rh = await prisma.rH.findFirst({
      where: {
        rh: rhUser
      }
    })

    if (rh === null) {
      throw new Error('RH no existe')
    }

    return rh
  }

  async gender(genderUser: enumGender): Promise<Gender> {
    const gender = await prisma.gender.findFirst({
      where: {
        gender: genderUser
      }
    })

    if (gender === null) {
      throw new Error('Genero no existe')
    }

    return gender
  }

  async site(siteUser: string): Promise<Site> {
    const site = await prisma.site.findFirst({
      where: {
        site: siteUser
      }
    })

    if (site === null) {
      throw new Error('Esta sede no existe')
    }

    return site
  }

  async function(funtionUser: string): Promise<Function> {
    const functionU = await prisma.function.findFirst({
      where: {
        function: funtionUser
      }
    })

    if (functionU === null) {
      throw new Error('Esta funcion no existe')
    };

    return functionU
  }

  async call(uDataUser: UserComplete): Promise<RegisterValidationType> {
    const [document, rol, rh, gender, site, functionU] = await Promise.all([
      this.documentType(uDataUser.documentTypeId),
      this.rol(uDataUser.rolId),
      this.rh(uDataUser.rhId),
      this.gender(uDataUser.genderId),
      this.site(uDataUser.siteId),
      this.function(uDataUser.functionId)
    ])
    // const document = this.documentType(uDataUser.documentTypeId)

    // const rol = this.rol(uDataUser.rolId)

    // const rh = this.rh(uDataUser.rhId)

    // const gender = this.gender(uDataUser.genderId)

    // const site = this.site(uDataUser.siteId)

    // const functionU = this.function(uDataUser.functionId)

    return {
      document,
      rol,
      rh,
      gender,
      site,
      functionU
    }
  }
}
