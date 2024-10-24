import { Request, Response, NextFunction } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import { UserRequest } from '../types/typesUser'

interface AuthMiddlewareInterface {
  routePrivate: (req: Request, res: Response, next: NextFunction) => void
  rolePermission: (role: string) => (req: Request, res: Response, next: NextFunction) => Response<Error> | void
}

export class AuthMiddleware implements AuthMiddlewareInterface {
  routePrivate (req: Request, res: Response, next: NextFunction): void {
    const { token } = req.cookies

    if (!token) {
      res.status(401).json({ message: 'No token, authorization denied' })
      return
    }

    jwt.verify(token, process.env.TOKEN_KEY as Secret, (err: unknown, user: unknown) => {
      if (err) {
        res.status(401).json({ message: 'Invalid Token' })
        return
      }

      const { id, rol } = user as UserRequest

      req.user = { id, rol }
    })

    next()
  }

  rolePermission (role: string) {
    return (req: Request, res: Response, next: NextFunction): Response<Error> | void => {
      if (req.user.rol !== role) {
        return res.status(401).json({ message: 'Access denied' })
      }
      next()
    }
  }
}
