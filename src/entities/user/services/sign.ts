import { GetObjectCommand, GetObjectCommandOutput } from '@aws-sdk/client-s3'
import { client } from '../../../config/S3config'

export class SignService {
  async getSign(id: string): Promise<GetObjectCommandOutput> {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `signs/${id}`
    })

    const res = await client.send(command)

    return res
  }
}
