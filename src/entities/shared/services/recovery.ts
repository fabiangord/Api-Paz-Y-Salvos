import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { prisma } from '../../../config/db'
import { EnvConfig } from '../../../config/env'
import { AuthServices } from './auth'
import { EmailService } from './email'
import { TokenService } from './token'

export class RecoveryService {
  constructor(
    private readonly service: AuthServices = new AuthServices(),
    private readonly serviceEmail: EmailService = new EmailService(),
    private readonly env: EnvConfig = new EnvConfig(),
    private readonly serviceToken: TokenService = new TokenService()
  ) { }

  async recoveryPassword(email: string): Promise<string | SMTPTransport.SentMessageInfo> {
    const emailUser = await this.service.login(email)

    if (emailUser === null) throw new Error('credentials unauthorized')

    const user = await prisma.user.findFirst({
      where: {
        Credentials: {
          every: {
            id: emailUser?.id
          }
        }
      },
      include: {
        Rol: true
      }
    })

    console.debug(user)

    if (!user) throw new Error('User unauthorized')

    const token = await this.serviceToken.createAccessToken({ id: user?.id, rol: user?.Rol.rol })

    console.debug(emailUser?.email)

    const emailCreate = await this.serviceEmail.createMail({
      from: this.env.api_mail!,
      to: `${emailUser.email}`,
      subject: 'Email para recuperar password',
      text: 'Hola!, este correo es para recuperar tu contraseña',
      html: `<strong> Hola, ingresa al siguiente link => ${this.env.frontend}/recovery?token=${token} <strong/>`
    })

    return emailCreate
  }
}
