import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { AuthServices } from '../services/auth'
import { UserComplete } from '../types/typesUser'
import { validatedUser } from '../schemas/validation'
import { TokenService } from '../services/token'
import { EncryptService } from '../services/encrypt'
import { validateLoginSchema } from '../schemas/validationLogin'
import { validateRecovery } from '../schemas/recovery'
import { RecoveryService } from '../services/recovery'

export class AuthController {
  constructor(private readonly authService: AuthServices = new AuthServices(),
    private readonly tokenService: TokenService = new TokenService(),
    private readonly encryptService: EncryptService = new EncryptService(),
    private readonly recoveryService: RecoveryService = new RecoveryService()
  ) { }

  public async login(req: Request, res: Response): Promise<Response<UserComplete> | string> {
    try {
      const validatedUser = validateLoginSchema(req.body)

      const userFound = await this.authService.login(validatedUser.email)

      if (userFound == null) return res.status(400).json({ message: 'user not found' })

      const desencrypt = await this.encryptService.substitutionEncrypt(userFound.password, 'a@x')

      const isMatch = await bcrypt.compare(validatedUser.password, desencrypt)

      if (!isMatch) return res.status(400).json({ message: 'invalid credentials' })

      const token = await this.tokenService.createAccessToken({ id: userFound.userId, rol: userFound.user.rolId })

      res.cookie('token', token, {
        httpOnly: true,
        secure: !(process.env.MOOD === 'dev'),
        sameSite: true
      })

      return res.json(userFound.user)
    } catch (error) {
      return error instanceof Error ? res.status(400).json({ message: error.message }) : `unexpected error ${error}`
    }
  }

  public async register(req: Request, res: Response): Promise<Response<UserComplete> | string> {
    try {
      const newUser = validatedUser(req.body)

      const savedUser = await this.authService.register(newUser)

      return res.json(savedUser)
    } catch (error) {
      return error instanceof Error ? res.status(400).json({ message: error.message }) : `unexpected error ${error}`
    }
  }

  public async recovery(req: Request, res: Response): Promise<Response<string> | string> {
    try {
      const email = validateRecovery(req.body)
      const sendMail = await this.recoveryService.recoveryPassword(email.email)
      console.debug(sendMail)
      return res.status(200).json(sendMail)
    } catch (error) {
      // console.error(error)
      return error instanceof Error ? res.status(400).json({ message: error.message }) : `unexpected error ${error}`
    }
  }

  public logout(_req: Request, res: Response): Response | string {
    try {
      res.cookie('token', ' ', {
        expires: new Date(0)
      })

      return res.sendStatus(200)
    } catch (error) {
      return error instanceof Error ? res.status(400).json({ message: error.message }) : `unexpected error ${error}`
    }
  }
}
