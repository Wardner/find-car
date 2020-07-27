import { Model } from '../../../database/entities/Model';
import { ModelDTO } from '../domain/dtos/ModelDTO';
import { ModelService } from '../services/ModelService';

export class ModelController {
  constructor(
    private _ModelService: ModelService
  ) {}

  public async getAll() {
    const models = await this._ModelService.getAllModels();
    if(models)
      return models;

    throw new Error("Modelos No Encontrados")
  }

  public async getById(id: number) {
    const model = await this._ModelService.getModelById(id);
    if(!model)
      throw new Error("Modelo No Encontrado")

    return model;
  }

  public async create(modelPayload: ModelPayload | any) {
    const model = await this._ModelService.mapToEntity(modelPayload);

    let created = await this._ModelService.create(model as Model);

    if(created)
      return created;

    throw new Error("No se pudo crear el modelo");
  }

  public async update(id: number, updates: {}) {
    const model = await this._ModelService.getModelById(id);
    if(model){
      let updated = await this._ModelService.update(model, updates);
      return updated;
    }

    throw new Error("No se hallo el modelo");
  }

  public async delete(id: number) {
    const model = await this._ModelService.getModelById(id);
    if(model){
      let deleted = await this._ModelService.delete(model);
      return deleted;
    }

    throw new Error("No se hallo el modelo")
  }

}
