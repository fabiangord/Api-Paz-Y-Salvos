import * as dotenv from 'dotenv'

export abstract class ConfigServer {
  constructor () {
    const createConfig = this.createdVariableConfigEnv(this.nodeEnv)

    dotenv.config({
      path: createConfig,
      override: true
    })
  }

  public getEnviroment (k: string): string | undefined {
    return process.env[k]
  }

  public getEnviromentNumber (k: string): number {
    return Number(this.getEnviroment(k))
  }

  public get nodeEnv (): string {
    return this.getEnviroment('NODE_ENV')?.trim() ?? ''
  }

  public createdVariableConfigEnv (path: string): string {
    const arrEnv: string[] = ['env']

    if (path.length > 0) {
      const stringArray = path.split('.')
      arrEnv.unshift(...stringArray)
    }

    return '.' + arrEnv.join('.')
  }
}
