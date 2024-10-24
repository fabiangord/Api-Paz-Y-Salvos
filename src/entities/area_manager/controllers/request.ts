import { Request, Response } from 'express'
import { RequestServiceAM } from '../services/request'
import { RequestModel, validation } from '@prisma/client'
import { validateValidation } from '../schemas/aproveValidation'

export class RequestController {
  constructor(private readonly service: RequestServiceAM = new RequestServiceAM()) { }

  async getRequest(req: Request, res: Response): Promise<Response<RequestModel> | string> {
    try {
      const request = await this.service.findRequest(req.user.id)
      return res.json(request)
    } catch (error) {
      return error instanceof Error ? res.status(400).json({ message: error.message }) : `unexpected error ${error}`
    }
  }

  async validation(req: Request, res: Response): Promise<Response<validation> | string> {
    try {
      const validationInfo = validateValidation(req.body)
      const validations = await this.service.validation(req.user.id, validationInfo.idRequest, validationInfo.commentary, validationInfo.status)
      return res.json(validations)
    } catch (error) {
      console.debug(error)
      return error instanceof Error ? res.status(400).json({ message: error.message }) : `unexpected error ${error}`
    }
  }

  async getValidation(req: Request, res: Response): Promise<Response<validation[]> | string> {
    try {
      const validation = await this.service.getValidation(req.body.idRequest)
      if (validation === null) throw new Error('validation don´t exist')
      return res.json(validation)
    } catch (error) {
      return error instanceof Error ? res.status(400).json({ message: error.message }) : `unexpected error ${error}`
    }
  }
}
