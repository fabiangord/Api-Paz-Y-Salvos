import { DocumentType, Function, Gender, RH, Rol, Site, User, enumDocumentType, enumGender, enumRH, enumRol } from '@prisma/client'

declare module 'express-serve-static-core' {
  export interface Request {
    user: {
      id: string
      rol: string
    }
  }
}

type UserRequest = {
  id: string
  rol: string
  iat: number
  exp: number
}
export type Cors = {
  origin: string
  credentials: boolean
  opcionSuccessStatus: number
}

export type UserComplete = {
  id?: string
  documentTypeId: enumDocumentType
  rolId: enumRol
  document: string
  password: string
  name: string
  lastname: string
  email: string
  cellphone: string
  city: string
  rhId: enumRH
  genderId: enumGender
  siteId: string
  functionId: string
}

export type CredentialsType = {
  id: string
  email: string
  password: string
  user: User
  userId: string
}

export type LoginType = {
  email: string
  password: string
}

export type Payload = {
  id: string
  rol: string
}

export type RegisterValidationType = {
  document: DocumentType
  rol: Rol
  rh: RH
  gender: Gender
  site: Site
  functionU: Function
}

export type MailType = {
  from: string
  to: string
  subject: string
  text: string
  html: string
}
