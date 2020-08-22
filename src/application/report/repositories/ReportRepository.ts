import { EntityRepository, Repository } from 'typeorm';
import { Report } from '../../../database/entities/Report';

@EntityRepository(Report)
export class ReportRepository extends Repository<Report> {
  public getAll = async(): Promise<Report[]> =>
    await this.manager.getRepository(Report).find();

  public getById = async (id: number): Promise<Report|undefined> =>
    await this.manager.getRepository(Report).findOne(id)
}