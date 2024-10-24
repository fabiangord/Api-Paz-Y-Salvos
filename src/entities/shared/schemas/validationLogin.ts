import { z } from 'zod'
import { LoginType } from '../types/typesUser'

const userLoginSchema = z.object({
  email: z.string({
    required_error: 'invalid type'
  }),
  password: z.string({
    required_error: 'invalid type'
  })
})

export function validateLoginSchema (user: LoginType): LoginType {
  return userLoginSchema.parse(user)
}
