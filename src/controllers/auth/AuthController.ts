import type { Request, Response } from 'express'
import { AuthService } from '../../service/auth/AuthService'
import { UserAuthType, UserType } from '../../types/user/user.type'
export class AuthController {

  static createAccount = async (req: Request, res: Response) => {
    const { name, email, password }: UserType = req.body
    const response = await AuthService.createUser(name, email, password)
    res.json({
      error: response.error,
      message: response.message,
      data: response.data,
      token: response.token,
      status: response.status
    })
  }

  static login = async (req: Request, res: Response) => {
    const { email, password }: UserAuthType = req.body 
    const response = await AuthService.login(email,password)
    res.json({
      error: response.error,
      message : response.message,
      data: response.data,
      token: response.token,
      status: response.status
    })
  }
}