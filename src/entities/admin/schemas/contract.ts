import z from 'zod'
import { Contract } from '@prisma/client'

const contractSchema = z.object({
  id: z.string({
    required_error: 'id type not soported'
  }).optional(),
  NoContract: z.string({
    required_error: 'NoContract type not soported'
  }),
  dateI: z.string({
    required_error: 'dateI type not soported'
  }).transform(val => new Date(val)),
  dateF: z.string({
    required_error: 'dateF type not soported'
  }).transform(val => new Date(val)),
  contractor: z.string({
    required_error: 'id type not soported'
  }),
  priceContract: z.number({
    required_error: 'priceContract type is not supported'
  }),
  causalFinished: z.string({
    required_error: 'Causal Final type not soported'
  }),
  userId: z.string({
    required_error: 'id type not soported'
  })
})

export function validateContract(object: Omit<Contract, 'id'>): Omit<Contract, 'id'> {
  return contractSchema.parse(object)
}
