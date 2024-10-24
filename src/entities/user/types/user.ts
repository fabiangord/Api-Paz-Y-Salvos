import { Contract, Site } from '@prisma/client'
import { typeRequest } from '../libs/user'

export type RequestFromClient = {
  id?: string
  date?: Date
  typeRequest: typeRequest
  status?: 'APROBADO' | 'PENDIENTE' | 'RECHAZADO'
  contract: Contract
}

export type RequestAddFromClient = {
  id?: string
  date?: Date
  typeRequest: typeRequest
  status?: 'APROBADO' | 'PENDIENTE' | 'RECHAZADO'
  contract: string
}

export type UpdateUserFromClient = {
  name?: string
  lastname?: string
  cellphone?: string
  Site?: {
    site: string
  }
  city?: string
}

export type UserFromPDF = {
  document: string
  city: string
  Contract: Contract[]
  Site: Site
  lastname: string
  name: string
}
