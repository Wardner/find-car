import { Model } from '../../../database/entities/Model';
import { ModelDTO } from '../domain/dtos/ModelDTO';
import { ModelRepository } from '../repositories/ModelRepository';
import { ModelMapper } from '../domain/mappers/ModelMapper';

export class ModelService {
  constructor(
    private _ModelRepository: ModelRepository,
    private _ModelMapper: ModelMapper
  ) {}

  public mapToEntity = async(modelPayload: ModelPayload): Promise<Model> =>
    await this._ModelMapper.mapToEntity(modelPayload);

  public async getAllModels() {
    const models = await this._ModelRepository.getAll().then(model =>
      this._ModelMapper.mapListToDTO(model));
      return models;
  }

  public getModelById = async(id: number) => 
    await this._ModelRepository.getById(id);

  public create = async(modelEntity: Model) => {
    return await this._ModelRepository.save(modelEntity).then(model =>
      this._ModelMapper.mapToDTO(model));
  }

  public async update(model: Model, updates: {}) {
    const updated = await this._ModelRepository.updateModel(model, updates);
    return await this._ModelRepository.save(updated as Model);
  }

  public async delete(model: Model) {
    let { id } = model;
    const deleted = await this._ModelRepository.deleteModel(id);
    return deleted;
  }

  public getAllByBrand = async(id: number) =>
    await this._ModelRepository.getByBrand(id);
  
}
