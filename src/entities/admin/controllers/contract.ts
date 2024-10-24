import { Contract } from '@prisma/client'
import { Request, Response } from 'express'
import { ContractService } from '../service/contract'
import { validateContract } from '../schemas/contract'

export class ContractController {
  constructor(private readonly service: ContractService = new ContractService()) { }

  async addContract(req: Request, res: Response): Promise<Response<Contract> | string> {
    try {
      const contractFromClient = validateContract(req.body)
      const contract = await this.service.addContract(contractFromClient)
      console.debug(contract)
      return res.json(contract)
    } catch (error) {
      return error instanceof Error ? res.status(400).json({ message: error.message }) : `unexpected error ${error}`
    }
  }
}
