import { $Enums, User, enumStatus } from '@prisma/client'

export type aproveValidationTypeStatus = 'APROBADO' | 'RECHAZADO'

export type UserCommentaryInput = {
  id: string
  documentTypeId: string
  document: string
  rolId: string
  name: string
  lastname: string
  cellphone: string
  city: string
  rhId: string
  genderId: string
  siteId: string
  functionId: string
  Firma: Buffer
  status: enumStatus
  commentary: string
  areaManager: User
}

export type aproveValidationType = {
  idRequest: string
  commentary: string
  status: aproveValidationTypeStatus
}

export type RequestAdminType = Array<{
  date: Date
  status: $Enums.enumStatus
  contract: { NoContract: string }
  user: {
    document: string
    Function: {
      function: string
    }
  }
}>
