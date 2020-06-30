import { AdminDTO } from '../../../application/admin/providers/AdminProvider'

declare global {
  namespace Express {
    export interface Request {
      admin?: AdminDTO
    }
  }
}