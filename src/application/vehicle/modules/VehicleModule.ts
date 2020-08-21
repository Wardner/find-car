import { getCustomRepository } from 'typeorm'
import { VehicleController, VehicleRepository, VehicleService, VehicleMapper } from '../providers/VehicleProvider';
import { StadisticRepository } from '../repositories/StadisticRepository';
import { BrandService } from '../../brand/services/BrandService';
import { BrandMapper } from '../../brand/domain/mappers/BrandMapper';
import { BrandRepository } from '../../brand/repositories/BrandRepository';


export class VehicleModule {
  //Repositories
  private _vehicleRepository: VehicleRepository
  private _stadisticRepository: StadisticRepository
  private _brandRepository: BrandRepository

  //Mappers
  private _vehicleMapper: VehicleMapper
  private _brandMapper: BrandMapper

  //Services
  private _vehicleService: VehicleService
  private _brandService: BrandService

  //Controllers
  private _vehicleController: VehicleController


  get userRepository(): VehicleRepository {
    return !this._vehicleRepository ?
      (this._vehicleRepository = getCustomRepository(VehicleRepository))
    : this._vehicleRepository
  }

  get brandRepository(): BrandRepository {
    return !this._brandRepository ?
      (this._brandRepository = getCustomRepository(BrandRepository))
    : this._brandRepository
  }

  get stadisticRepository(): StadisticRepository {
    return !this._stadisticRepository ?
      (this._stadisticRepository = getCustomRepository(StadisticRepository))
    : this._stadisticRepository
  }

  get userMapper(): VehicleMapper {
    return !this._vehicleMapper ?
      (this._vehicleMapper = new VehicleMapper(this.userRepository))
    : this._vehicleMapper
  }

  get brandMapper(): BrandMapper {
    return !this._brandMapper ?
      (this._brandMapper = new BrandMapper(this.brandRepository))
    : this._brandMapper
  }

  get userService(): VehicleService {
    return !this._vehicleService ?
      (this._vehicleService = new VehicleService(
        this.userRepository,
        this.userMapper
      )) : this._vehicleService
  }
  
  
  get brandService(): BrandService {
    return !this._brandService ?
      (this._brandService = new BrandService(
        this.brandRepository,
        this.brandMapper
      )) : this._brandService
  }

  get controller(): VehicleController {
    return !this._vehicleController ?
      (this._vehicleController = new VehicleController(this.userService, this.brandService, this.stadisticRepository))
    : this._vehicleController
  }
}

export const vehicleModule = new VehicleModule();
