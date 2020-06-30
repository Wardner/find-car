import jwt, { Secret } from 'jsonwebtoken';
import { Configuration as config } from '../../../config/Configuration';
import { AdminDTO } from '../../application/admin/domain/dtos/AdminDTO';
import { LecturerDTO } from '../../application/lecturer/domain/dtos/LecturerDTO';

export const JWToken = {
  verifyToken: async (token: string): Promise<any> =>
    jwt.verify(token, config.jwt.secret as string | Buffer),

  generateAToken: async (admin: AdminDTO) => 
    ({token: jwt.sign({ admin }, config.jwt.secret as Secret, 
      { expiresIn: config.jwt.tokenExpire })
    }),
  
  generateLToken: async (lecturer: LecturerDTO) => 
    ({token: jwt.sign({ lecturer }, config.jwt.secret as Secret, 
      { expiresIn: config.jwt.tokenExpire })
    })
}

