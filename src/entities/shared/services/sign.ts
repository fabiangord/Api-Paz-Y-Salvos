import { PutObjectCommandOutput, PutObjectCommand } from '@aws-sdk/client-s3'
import { client } from '../../../config/S3config'

interface SignServiceUserInterface {
  updateSign: (file: Buffer, id: string) => Promise<PutObjectCommandOutput>
}

export class SignService implements SignServiceUserInterface {
  async updateSign(file: Buffer, id: string): Promise<PutObjectCommandOutput> {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: `signs/${id}`,
      Body: file
    })

    return await client.send(command)
  }
}
