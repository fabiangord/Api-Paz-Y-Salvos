import { Request, Response } from 'express'
import { DocumentService } from '../services/document'

export class DocumentControllerUser {
  constructor(private readonly service: DocumentService = new DocumentService()) { }

  async createDocument(req: Request, res: Response): Promise<Response<string> | string> {
    try {
      const request = await this.service.createDocument(req.user.id, req.body.idRequest)

      res.write(request)

      return res.end()
    } catch (error) {
      return error instanceof Error ? res.status(400).json({ message: error.message }) : `unexpected error ${error}`
    }
  }
}
