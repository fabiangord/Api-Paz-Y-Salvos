import z from 'zod'
import { aproveValidationType } from '../types/types'

const aproveValidationSchema = z.object({
  idRequest: z.string({
    required_error: 'id type not soported'
  }),
  commentary: z.string({
    required_error: 'commentary type not soported'
  }).max(100),
  status: z.enum(['APROBADO', 'RECHAZADO'], {
    invalid_type_error: 'status enum not supported',
    required_error: 'status type not supported'
  })
})

export function validateValidation (object: aproveValidationType): aproveValidationType {
  return aproveValidationSchema.parse(object)
}
