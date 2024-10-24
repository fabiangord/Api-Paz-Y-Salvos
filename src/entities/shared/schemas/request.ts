import z from 'zod'
import { typeRequest } from '../../user/libs/user'
import { RequestAddFromClient } from '../../user/types/user'

const requestSchema = z.object({
  id: z.string({
    required_error: 'id type not soported'
  }).optional(),
  date: z.date({
    required_error: 'date type not soported'
  }).optional(),
  typeRequest: z.nativeEnum(typeRequest),
  status: z.enum(['APROBADO', 'PENDIENTE', 'RECHAZADO'], {
    invalid_type_error: 'status enum not supported',
    required_error: 'status type not supported'
  }).optional(),
  contract: z.string({
    required_error: 'contract type not supported'
  })
})

export function validateRequest(object: RequestAddFromClient): RequestAddFromClient {
  return requestSchema.parse(object)
}
