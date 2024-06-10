import bcrypt from 'bcrypt'
export class Helper {

  static hashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
  }

  static compareHash = (password: string, hash: string) => {
    const isValid = bcrypt.compareSync(password, hash)
    if (isValid) {
      return true
    }
    return false
  }
}