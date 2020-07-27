import { Mapper } from 'ts-simple-automapper';
import { ModelRepository } from '../../repositories/ModelRepository';
import { Model } from '../../../../database/entities/Model';
import { ModelDTO } from '../dtos/ModelDTO';

export class ModelMapper {
  constructor(private _ModelRepository: ModelRepository) {}
  
  public mapToDTO(from: Model): ModelDTO {
    const modelDTO: ModelDTO = new Mapper().map(from, new ModelDTO());
    return modelDTO;
  }

  public mapToEntity = async(from: ModelPayload): Promise<Model> =>
    this._ModelRepository.create(from as Model);

  public mapListToDTO(models: Model[]): ModelDTO[] {
    return models.map(model => this.mapToDTO(model));
  }
}