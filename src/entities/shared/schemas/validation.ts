import z from 'zod'
import { UserComplete } from '../types/typesUser'
import { enumDocumentType, enumGender, enumRH, enumRol } from '@prisma/client'

const userSchema = z.object({
  id: z.string({
    required_error: 'id type not supported'
  }).optional(),
  documentTypeId: z.nativeEnum(enumDocumentType),
  rolId: z.nativeEnum(enumRol),
  document: z.string({
    required_error: 'document type not supported'
  }),
  password: z.string({
    required_error: 'password type not supported'
  }),
  name: z.string({
    required_error: 'name type not supported'
  }),
  lastname: z.string({
    required_error: 'lastname type not supported'
  }),
  email: z.string({
    required_error: 'email type not supported'
  }),
  cellphone: z.string({
    required_error: 'cellphone type not supported'
  }),
  city: z.string({
    required_error: 'city type not supported'
  }),
  rhId: z.nativeEnum(enumRH),
  genderId: z.nativeEnum(enumGender),
  siteId: z.string({
    required_error: 'siteId type not supported'
  }),
  functionId: z.string({
    required_error: 'functionId type not supported'
  })
})

export function validatedUser(object: UserComplete): UserComplete {
  return userSchema.parse(object)
}
