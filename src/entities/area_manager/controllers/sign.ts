import { Request, Response } from 'express'
import { SignService } from '../services/sign'
import { GetObjectCommandOutput } from '@aws-sdk/client-s3'

export class SignController {
  constructor (private readonly service: SignService = new SignService()) { }

  async getSigns (_req: Request, res: Response): Promise<Response<GetObjectCommandOutput[]> | string> {
    try {
      const signs = await this.service.getSigns()
      console.log(signs)
      return res.json({ message: 'downloaded sign' })
    } catch (error) {
      return error instanceof Error ? res.status(400).json({ message: error.message }) : `unexpected error ${error}`
    }
  }
}
