import { check, param } from 'express-validator';
import { UserResponses } from './UserResponses';
// import { getCommonPassword as passwords } from '../../../infrastructure/utils/commonPasswors'
let status: string = 'false';

const { VALIDATOR } = UserResponses

const verifyEmail = [
  check('email', VALIDATOR.EMAIL)
    .isEmail()
    .normalizeEmail({ all_lowercase: true })
]

const verifyEmailWithCode = [
  ...verifyEmail,
  check('code', VALIDATOR.CODE)
    .isInt()
    .isLength({
      min: 4
    })
]

const convertBoolean = [
  check('status', VALIDATOR.STATUS)
    .exists()
    .toBoolean()
    .isBoolean()
]

const signup = [
  ...verifyEmail,
  check('password', VALIDATOR.PASSWORD)
    .trim()
    // .not().isIn(passwords() as string[])
    // .withMessage(VALIDATOR.COMMON_PASSWORD)
    .isLength({ min: 6 })
]

const login = [
  check('emailOrUsername', VALIDATOR.EMAIL_OR_USERNAME)
    .isLength({
      min: 3
    }),
  check('password', VALIDATOR.PASSWORD)
    .isLength({
      min: 6
    })
]

export const validators = {
  signup,
  login,
  forgotPassword: [...verifyEmail],
  verifyEmail,
  verifyEmailWithCode,
  convertBoolean
}