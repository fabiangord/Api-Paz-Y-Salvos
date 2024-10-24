import bcrypt from 'bcrypt'

interface EncryptInterface {
  hash: (password: string) => Promise<string>
  substitutionEncrypt: (text: string, key: string) => Promise<string>
}

export class EncryptService implements EncryptInterface {
  async hash (password: string): Promise<string> {
    const passwordHash = await bcrypt.hash(password, 10)
    const reHash = await this.substitutionEncrypt(passwordHash, 'a@x')
    return reHash
  }

  async substitutionEncrypt (text: string, key: string): Promise<string> {
    let mixed = ''

    for (let i = 0; i < text.length; i++) {
      const textCode = text.charCodeAt(i)
      const keyCode = key.charCodeAt(i % key.length)
      const xorCode = textCode ^ keyCode
      const xorChar = String.fromCharCode(xorCode)
      mixed += xorChar
    }

    return mixed
  }
}
