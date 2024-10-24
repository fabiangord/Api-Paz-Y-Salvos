import z from 'zod'

const recoverySchema = z.object({
  email: z.string().email({
    message: 'only support email type'
  })
})

export function validateRecovery(email: string): { email: string } {
  return recoverySchema.parse(email)
}
