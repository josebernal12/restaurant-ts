import { generateToken } from "../../helpers/config/generateToken"
import { Helper } from "../../helpers/helper/helper"
import { Validate } from "../../helpers/helper/validation"
import { ResponseApi } from "../../helpers/response/response"
import Auth from "../../models/auth/AuthModel"
import { ResponseType } from "../../types/response/response.types"
import { UserAuth } from "../../types/user/user.type"

export class AuthService {

  static createUser = async (name: string, email: string, password: string): Promise<ResponseType<UserAuth>> => {
    try {
      const exist = await Validate.existEmail(email)
      if (exist) {
        const hash = Helper.hashPassword(password)
        const newUser = await Auth.create({ name, email, password: hash })
        if (!newUser) {
          return ResponseApi.error(true, 'error al crear usuario', 404)
        }
        const token = generateToken({ _id: newUser._id })
        return ResponseApi.success<UserAuth>({
          error: false,
          message: 'se ha registrado exitosamente',
          data: [newUser],
          token,
          status: 200
        })
      }

      return ResponseApi.error(true, 'ya existe el email', 404)
    } catch (error) {
      return ResponseApi.error(true, 'entro al catch', 500)

    }
  }
  static login = async (email: string, password: string): Promise<ResponseType<UserAuth>> => {
    try {
      const exist = await Validate.existEmail(email)
      if (exist) {
        const user = await Auth.findOne({ email })
        if (user) {
          const isValid = Helper.compareHash(password, user.password)
          if (isValid) {
            const token = generateToken({ _id: user._id })
            return ResponseApi.success<UserAuth>({
              error: false,
              message: 'login exitosamente!',
              data: [user],
              token,
              status: 200
            })
          }
        }
        return ResponseApi.error(true, 'email o password son incorrectos', 404)
      }
      return ResponseApi.error(true, 'email o password son incorrectos', 400)
    } catch (error) {
      return ResponseApi.error(true, 'entro al catch', 500)
    }
  }
}