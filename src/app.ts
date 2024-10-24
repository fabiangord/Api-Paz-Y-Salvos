import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import { ConfigServer } from './config/config'
import { AuthRouter } from './entities/shared/routes/auth'
import { UserInfoRouter } from './entities/user/routes/user'
import { UserRequestRouter } from './entities/user/routes/request'
import { AdminRoutes } from './entities/admin/routes/admin'
import { RequestAreaMRouter } from './entities/area_manager/routes/request'
import { InfoAMRoutes } from './entities/area_manager/routes/info'
import { Cors } from './entities/shared/types/typesUser'
import { SignRouter } from './entities/area_manager/routes/sign'
import { SignUserRouter } from './entities/user/routes/sign'
import { DocumentRoutes } from './entities/user/routes/document'
import { InfoRouterAdmin } from './entities/admin/routes/info'
import { RegisterAdmin } from './entities/admin/routes/register'
import { ContractAdmin } from './entities/admin/routes/contract'

class Server extends ConfigServer {
  public app: express.Application = express()
  public PORT: number = this.getEnviromentNumber('PORT')
  private readonly corsOptions: Cors = {
    origin: process.env.CORS!,
    credentials: true,
    opcionSuccessStatus: 200
  }

  constructor() {
    super()
    this.app.disable('x-powered-by')
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cookieParser())
    this.app.use(express.json())
    this.app.use(morgan('dev'))
    this.app.use(fileUpload({
      limits: { fileSize: 2 * 1024 * 1024 }
    }))
    this.app.use(cors(this.corsOptions))
    this.app.use('/api', this.routers())
    this.listen()
  }

  public routers(): express.Router[] {
    return [
      new AuthRouter().router,
      new UserRequestRouter().router,
      new UserInfoRouter().router,
      new SignUserRouter().router,
      new AdminRoutes().router,
      new InfoRouterAdmin().router,
      new RegisterAdmin().router,
      new ContractAdmin().router,
      new InfoAMRoutes().router,
      new RequestAreaMRouter().router,
      new SignRouter().router,
      new DocumentRoutes().router
    ]
  }

  public listen(): void {
    this.app.listen(this.PORT, () => {
      console.log(`Server running on port ${this.PORT}`)
    })
  }
}

new Server()
