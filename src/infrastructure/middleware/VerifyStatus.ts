import { Response, NextFunction, Request } from 'express'
import { statusCodes } from '../routes/statusCodes';

//Verificar el estado de la cuenta
export const verifyStatus = (req: Request, res: Response, next: NextFunction) => {
  
  let { status } = req.user;
  console.log(req.user);

  if(!status)
    return res
      .status(statusCodes.UNAUTHORIZED)
      .send('UNAUTHORIZED, Please Check your email to activate your account')
  
  next();
}
