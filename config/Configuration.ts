import dotenv from 'dotenv'
dotenv.config({
  path: '.env'
})

export const Configuration = {
  server: {
    port: parseInt(process.env.PORT as string),
    prefixRoutes: process.env.PREFIX_ROUTES,
  },
  jwt: {
    secret: process.env.SECRET,
    tokenExpire: process.env.TOKEN_EXPIRE,
  },
  utils: {
    uploads: process.env.UPLOADS_USERS || 'uploads',
  }
}
