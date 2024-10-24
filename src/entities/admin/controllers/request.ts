import { Request, Response } from 'express'
import { RequestAdmin } from '../service/request'
import { RequestModel } from '@prisma/client'

export class RequestController {
  constructor(private readonly service: RequestAdmin = new RequestAdmin()) { }

  async get(_req: Request, res: Response): Promise<Response<RequestModel> | string> {
    try {
      const request = await this.service.getRequest()
      return res.json(request)
    } catch (error) {
      return error instanceof Error ? res.status(400).json({ message: error.message }) : `unexpected error ${error}`
    }
  }
}
