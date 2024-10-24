import { Request, Response } from 'express'
import { SignService } from '../services/sign'
import { UploadedFile } from 'express-fileupload'

export class SignSharedController {
  constructor(private readonly service: SignService = new SignService()) { }

  async updateSign(req: Request, res: Response): Promise<Response | string> {
    try {
      const file = req.files?.File as UploadedFile

      const signUpdate = await this.service.updateSign(file.data, req.user.id)

      return res.json(signUpdate)
    } catch (error) {
      return error instanceof Error ? res.status(400).json({ message: error.message }) : `unexpected error ${error}`
    }
  }
}
