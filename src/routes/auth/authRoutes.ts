import { Router } from 'express'
import { AuthController } from '../../controllers/auth/AuthController'
import validateCreate from '../../validators/users'
const router = Router()
//TODO agregar el middleware handleinputErrors
router.post('/create-account',
  validateCreate,
  AuthController.createAccount
)
router.post('/login', AuthController.login)
export default router