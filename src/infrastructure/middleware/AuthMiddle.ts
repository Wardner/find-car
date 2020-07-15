import { Response, NextFunction, Request } from 'express'
import { ResponseHandler } from '../routes/ResponseHandler'
import { statusCodes } from '../routes/statusCodes'
import { JWToken } from '../utils/JWTokens'

export const ensureAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.get('authorization')
    const message = 'The request does not have the authorization headers.'
    if (!token) {
      console.log(message);
      return res
        .status(statusCodes.INTERNAL_ERROR)
        .send(ResponseHandler.build(message))
    }

    const isValidToken = await JWToken.verifyToken(token)
    if (isValidToken) {
      req.user = isValidToken.user
      next()
    }
  } catch (e) {
    console.log(`[TOKEN ERROR]: ${e.name}, ${e.message}`)
    return res
      .status(statusCodes.UNAUTHORIZED)
      .send(ResponseHandler.build('An error occurred with the token verification.'))
  }
}
