import { DatabaseConnection } from './database/databaseConnection';
import { Application, Router } from 'express';
import { Routes } from './routes'

export class Main {
  protected router: Router = Router();

  constructor(protected app: Application) {
    this.app.use(this.router)
  }

  public async init() {
    await this.databaseConnection().catch((err) => console.log(err))
    this.buildRouting()
  }

  public databaseConnection = async () => 
    await DatabaseConnection
      .connect().then(connection => 
        console.log(`[DATABASE]: connected to ${connection.options.database} database`))
        

  public buildRouting = () => new Routes(this.router)
}