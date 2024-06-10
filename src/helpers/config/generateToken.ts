import jwt from 'jsonwebtoken'
import { env } from './envalid'
import { UserPayload } from '../../types/user/user.type'

export const generateToken = (payload: UserPayload) => {
  const token = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: '180d'
  })
  return token
}