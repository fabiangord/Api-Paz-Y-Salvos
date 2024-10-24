import { Request, Response } from 'express'
import { validateRequest } from '../schemas/request'
import { SharedRequestService } from '../services/request'
import { RequestModel, validation } from '@prisma/client'
import { SharedValidation } from '../services/validation'

export class SharedRequestController {
  constructor(
    private readonly requestService: SharedRequestService = new SharedRequestService(),
    private readonly validationService: SharedValidation = new SharedValidation()
  ) { }

  async addRequest(req: Request, res: Response): Promise<Response<RequestModel> | string> {
    try {
      const newRequest = validateRequest(req.body)

      const savedRequest = await this.requestService.requestAdd(newRequest, req.user.id, req)

      const areaManagers = await this.validationService.findAreaManager()

      await this.validationService.createValidation(areaManagers, savedRequest.id)

      return res.json(savedRequest)
    } catch (error) {
      return error instanceof Error ? res.status(400).json({ message: error.message }) : `unexpected error ${error}`
    }
  }

  async getRequest(req: Request, res: Response): Promise<Response<RequestModel[]> | string> {
    try {
      const request = await this.requestService.findRequest(req.user.id)
      return res.json(request)
    } catch (error) {
      return error instanceof Error ? res.status(400).json({ message: error.message }) : `unexpected error ${error}`
    }
  }

  async getValidation(req: Request, res: Response): Promise<Response<validation[]> | string> {
    try {
      const info = req.body.idRequest
      if (!info) throw new Error('dont id')
      const validation = await this.validationService.getValidation(info)
      return res.json(validation)
    } catch (error) {
      return error instanceof Error ? res.status(400).json({ message: error.message }) : `unexpected error ${error}`
    }
  }
}
