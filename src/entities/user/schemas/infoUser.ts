import { z } from 'zod'
import { User } from '@prisma/client'

const userInfoSchema = z.object({
  name: z.string({
    required_error: 'name type not supported'
  }).optional(),
  lastname: z.string({
    required_error: 'lastname type not supported'
  }).optional(),
  email: z.string({
    required_error: 'email type not supported'
  }).optional(),
  cellphone: z.string({
    required_error: 'cellphone type not supported'
  }).optional(),
  Site: z.object({
    site: z.string({
      required_error: 'site type not supported'
    })
  }).optional(),
  city: z.string({
    required_error: 'city type not supported'
  }).optional()
})

export function validateInfoUser (info: Partial<User>): Partial<User> {
  return userInfoSchema.parse(info)
}
