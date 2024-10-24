import { RequestModel } from '@prisma/client'

export interface FindRequest {
  findRequest: (user: string) => Promise<RequestModel[]>
}
