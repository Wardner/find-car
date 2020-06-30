import 'reflect-metadata'
import { Configuration as config } from '../config/Configuration'
import express, { Application } from 'express'
import { Main } from './main'
import cors from 'cors'
import morgan from 'morgan'

//Express Application
const app: Application = express();

//Middlewares
app.use(express.urlencoded({ extended: false }))
app.set('port', config.server.port)
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.get('/', (req, res) =>
  res.status(200).send({ msg: 'API Server of Conferences Application' }))

const initialize = () => 
  new Main(config.server.prefixRoutes as string, app).init()

export {
  app,
  initialize
}