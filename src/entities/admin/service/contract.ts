import { Contract } from '@prisma/client'
import { prisma } from '../../../config/db'
import { randomUUID } from 'node:crypto'

export class ContractService {
  async addContract(dataContract: Omit<Contract, 'id'>): Promise<Contract> {
    if (dataContract.userId === null) {
      throw new Error('Envia un documento valido')
    }

    return await prisma.contract.create({
      data: {
        id: randomUUID(),
        NoContract: dataContract.NoContract,
        contractor: dataContract.contractor,
        causalFinished: dataContract.causalFinished,
        dateI: dataContract.dateI,
        dateF: dataContract.dateF,
        priceContract: dataContract.priceContract,
        userId: await this.findUserForContract(dataContract.userId)
      }
    })
  }

  private async findUserForContract(document: string): Promise<string> {
    const user = await prisma.user.findUnique({
      where: {
        document
      }
    })

    if (user === null) {
      throw new Error('document don´t exist')
    }

    return user.id
  }
}
