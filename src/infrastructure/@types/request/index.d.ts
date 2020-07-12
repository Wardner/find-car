import { UserDTO } from '../../../application/user/providers/UserProvider'
declare global {
  namespace Express {
    export interface Request {
      user: UserDTO
    }
  }
}