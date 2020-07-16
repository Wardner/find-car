import { getCustomRepository } from 'typeorm'
import { VehicleController, VehicleRepository, VehicleService, VehicleMapper } from '../providers/VehicleProvider';


export class VehicleModule {
  //Repositories
  private _vehicleRepository: VehicleRepository

  //Mappers
  private _vehicleMapper: VehicleMapper

  //Services
  private _vehicleService: VehicleService

  //Controllers
  private _vehicleController: VehicleController


  get userRepository(): VehicleRepository {
    return !this._vehicleRepository ?
      (this._vehicleRepository = getCustomRepository(VehicleRepository))
    : this._vehicleRepository
  }

  get userMapper(): VehicleMapper {
    return !this._vehicleMapper ?
      (this._vehicleMapper = new VehicleMapper(this.userRepository))
    : this._vehicleMapper
  }

  get userService(): VehicleService {
    return !this._vehicleService ?
      (this._vehicleService = new VehicleService(
        this.userRepository,
        this.userMapper
      )) : this._vehicleService
  }

  get controller(): VehicleController {
    return !this._vehicleController ?
      (this._vehicleController = new VehicleController(this.userService))
    : this._vehicleController
  }
}

export const vehicleModule = new VehicleModule();
