import jwt from 'jsonwebtoken'
import { ConfigServer } from '../../../config/config'
import { Payload } from '../types/typesUser'

interface TokenInterface {
  createAccessToken: (payload: Payload) => Promise<string>
}

export class TokenService extends ConfigServer implements TokenInterface {
  async createAccessToken (payload: Payload): Promise<string> {
    return await new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        this.getEnviroment('TOKEN_KEY')!,
        {
          expiresIn: '15 minutes'
        },
        (err, token) => {
          token !== undefined ? resolve(token) : reject(err)
        }
      )
    })
  }
}
