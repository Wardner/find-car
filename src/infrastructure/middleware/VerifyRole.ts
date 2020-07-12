import { Response, NextFunction, Request } from 'express'
import { statusCodes } from '../routes/statusCodes';

export const verifyRole = (req: Request, res: Response, next: NextFunction) => {
  
  let role = req.user.role;
  console.log(role);

  if(role != 'admin' || 'ADMIN')
    return res
      .status(statusCodes.UNAUTHORIZED)
      .send('UNAUTHORIZED')
  
  next();
}

//ARREGLAR EL REQ.USER ESTA DANDO UNDEFINED
//ARREGLADO, RECUERDA QUE PARA QUE EL USER TENGA DATOS NECESITAMOS EL TOKEN HEADER.