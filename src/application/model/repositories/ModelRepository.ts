import { EntityRepository, Repository } from 'typeorm';
import { Model } from '../../../database/entities/Model';

@EntityRepository(Model)
export class ModelRepository extends Repository<Model> {
  public getAll = async(): Promise<Model[]> =>
    await this.manager.getRepository(Model).find();

  public getById = async (id: number): Promise<Model|undefined> =>
    await this.manager.getRepository(Model).findOne({ id });

  public deleteModel = async(id: number) =>
    await this.manager.getRepository(Model).delete({ id });

  public updateModel = async(model: Model, updates: any): Promise<Model|undefined> =>
    this.manager.getRepository(Model).merge(model, updates);

}
