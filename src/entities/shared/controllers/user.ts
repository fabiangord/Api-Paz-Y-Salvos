import { Request, Response } from 'express'
import { UserInfoService } from '../services/user'
import { UpdateUserFromClient } from '../../user/types/user'
import { validateInfoUser } from '../../user/schemas/infoUser'

export class InfoController {
  constructor(private readonly infoService: UserInfoService = new UserInfoService()) { }

  async getInfo(req: Request, res: Response): Promise<Response<UpdateUserFromClient> | string> {
    try {
      const info = await this.infoService.getInfoUser(req.user.id)
      return res.json(info)
    } catch (error) {
      return error instanceof Error ? res.status(400).json({ message: error.message }) : `unexpected error ${error}`
    }
  }

  async updateInfo(req: Request, res: Response): Promise<Response | string> {
    try {
      const updateUser = validateInfoUser(req.body)
      const updatedUser = await this.infoService.UpdateInfoUser(updateUser, req.user.id)
      return res.json(updatedUser)
    } catch (error) {
      return error instanceof Error ? res.status(400).json({ message: error.message }) : `unexpected error ${error}`
    }
  }
}
