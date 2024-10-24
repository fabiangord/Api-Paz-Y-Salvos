import { EnvConfig } from '../../../config/env'
import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { MailType } from '../types/typesUser'

export class EmailService {
  constructor(
    private readonly env: EnvConfig = new EnvConfig()
  ) { }

  private async createTransporterMail(): Promise<nodemailer.Transporter<SMTPTransport.SentMessageInfo>> {
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: this.env.api_mail,
        pass: this.env.api_email
      }
    })
  }

  async createMail(infoMail: MailType): Promise<SMTPTransport.SentMessageInfo | string> {
    const info = await (await this.createTransporterMail()).sendMail({
      from: `${infoMail.from}`,
      to: `${infoMail?.to}`,
      subject: `${infoMail.subject}`,
      text: `${infoMail.text}`,
      html: `${infoMail.html}`
    })

    return info
  }
}
