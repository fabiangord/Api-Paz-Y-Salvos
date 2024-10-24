import { GetObjectCommand, GetObjectCommandOutput } from '@aws-sdk/client-s3'
import { client } from '../../../config/S3config'
import { PDFDocument, PDFForm } from 'pdf-lib'
import { prisma } from '../../../config/db'
import { UserFromPDF } from '../types/user'
import { User } from '@prisma/client'
import { AreaManagerUsersService } from '../../area_manager/services/users'
import { SignService } from '../../area_manager/services/sign'

export class FormatService {
  constructor(private readonly service: AreaManagerUsersService = new AreaManagerUsersService(),
    private readonly serviceTwo: SignService = new SignService()) { }

  async getFormat(nameFormat: string): Promise<GetObjectCommandOutput> {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `formats/${nameFormat}`
    })

    return await client.send(command)
  }

  async loadDocument(): Promise<PDFDocument> {
    const format = (await this.getFormat('2024-02-20')).Body

    if (format == null) throw new Error('format undefined')

    return await PDFDocument.load(await format.transformToByteArray())
  }

  async userInfoDocument(id: string): Promise<UserFromPDF> {
    const user = await prisma.user.findUnique({
      where: {
        id
      },
      select: {
        document: true,
        city: true,
        Contract: true,
        Site: true,
        lastname: true,
        name: true
      }
    })

    if (user === null) throw new Error('User dont exist')

    return user
  }

  async infoAMPdf(): Promise<User[]> {
    return await this.service.getAM()
  }

  async findContract(idRequest: string): Promise<{ contract: { NoContract: string, dateI: Date } } | null> {
    return await prisma.requestModel.findUnique({
      where: {
        id: idRequest
      },
      select: {
        contract: {
          select: {
            NoContract: true,
            dateI: true
          }
        }
      }
    })
  }

  async signs(): Promise<Array<{ userId: string, signature: GetObjectCommandOutput }>> {
    return await this.serviceTwo.getSigns()
  }

  async generateInfoAMPdf(nameArea: string, nameSign: string, functionId: string, document: PDFDocument, form: PDFForm, signs: Array<{ userId: string, signature: GetObjectCommandOutput }>, areaManagers: User[], nameDateSign: string): Promise<void> {
    const users = areaManagers.filter(user => user.functionId === functionId)

    const getDateSign = await prisma.validation.findFirst({
      where: {
        areaManager: {
          functionId
        }
      },
      select: {
        dateSign: true
      }
    })

    const dateOptions: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }

    if (getDateSign?.dateSign === null) {
      throw new Error('aun faltan firmas')
    }

    form.getTextField(nameArea).setText(`${users.map(user => `${user.name} ${user.lastname}`)}`)
    form.getTextField(nameDateSign).setFontSize(5)
    form.getTextField(nameDateSign).setText(`${getDateSign?.dateSign?.toLocaleDateString('es-ES', dateOptions)}`)

    const signature = signs.filter(sgn => sgn.userId === users[0].id)[0].signature.Body

    if (signature) {
      const signatureImage = await document.embedJpg(await signature.transformToByteArray())
      form.getTextField(nameSign).setImage(signatureImage)
    }
  }

  async getSignClient(id: string, nameSign: string, form: PDFForm, document: PDFDocument): Promise<void> {
    const signature = (await this.service.getSigns(id)).Body

    if (signature) {
      const signatureImage = await document.embedJpg(await signature.transformToByteArray())
      form.getTextField(nameSign).setImage(signatureImage)
    }
  }
}
