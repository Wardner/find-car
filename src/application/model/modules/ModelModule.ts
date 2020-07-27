import { getCustomRepository } from 'typeorm';
import { ModelController } from '../controllers/ModelController';
import { ModelMapper } from '../domain/mappers/ModelMapper';
import { ModelService } from '../services/ModelService';
import { ModelRepository } from '../repositories/ModelRepository';

export class ModelModule {
  //Repositories
  private _modelRepository: ModelRepository

  //Mappers
  private _modelMapper: ModelMapper

  //Services
  private _modelService: ModelService

  //Controllers
  private _modelController: ModelController


  get modelRepository(): ModelRepository {
    return !this._modelRepository ?
      (this._modelRepository = getCustomRepository(ModelRepository))
    : this._modelRepository
  }

  get modelMapper(): ModelMapper {
    return !this._modelMapper ?
      (this._modelMapper = new ModelMapper(this.modelRepository))
    : this._modelMapper
  }

  get modelService(): ModelService {
    return !this._modelService ?
      (this._modelService = new ModelService(
        this.modelRepository,
        this.modelMapper
      )) : this._modelService
  }

  get controller(): ModelController {
    return !this._modelController ?
      (this._modelController = new ModelController(this.modelService))
    : this._modelController
  }
}

export const modelModule = new ModelModule();
