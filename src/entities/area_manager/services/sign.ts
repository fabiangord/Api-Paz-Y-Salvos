import { GetObjectCommandOutput } from '@aws-sdk/client-s3'
import { AreaManagerUsersService } from './users'

interface SignServiceInterface {
  getSigns: () => Promise<Array<{ userId: string, signature: GetObjectCommandOutput }>>
}

export class SignService implements SignServiceInterface {
  constructor(private readonly service: AreaManagerUsersService = new AreaManagerUsersService()) { }

  async getSigns(): Promise<Array<{ userId: string, signature: GetObjectCommandOutput }>> {
    const areaManagers = await this.service.getAM()

    const signs: Array<{ userId: string, signature: GetObjectCommandOutput }> = []

    for (const areaManager of areaManagers) {
      const res = await this.service.getSigns(areaManager.id)

      if (res.Body != null) {
        signs.push({ userId: areaManager.id, signature: res })
      }
    }

    return signs
  }
}
