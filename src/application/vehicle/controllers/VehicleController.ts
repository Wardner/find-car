import { VehicleDTO, VehicleService } from '../providers/VehicleProvider';
import { Vehicle } from '../../../database/entities/Vehicle';

export class VehicleController {
  constructor(
    private _VehicleService: VehicleService
  ) {}

  public async getAll() {
    const vehicles = await this._VehicleService.getAllVehicles();
    if(vehicles)
        return vehicles;
    
    throw new Error("Vehiculos no encontrados");
  }

  public async getById(id: number) {
    const vehicle = await this._VehicleService.getVehicleById(id);
    if(!vehicle)
      throw new Error("Vehiculo no encontrado");

    return vehicle;
  }

  public async create(vehiclePayload: VehiclePayload | any) {
    const vehicle = await this._VehicleService.mapToEntity(vehiclePayload);
    const vehicleExist = await this._VehicleService.getVehicleById(vehicle.id as number);

    if(vehicleExist)
      throw new Error("BAD REQUEST. Vehicle Exist");

    let created = await this._VehicleService.create(vehicle as Vehicle);

    if(created){
      return created;
    }

    throw new Error("No se creo el vehiculo");
  }

  public async update (id: number, updates: {}) {
    const vehicle = await this._VehicleService.getVehicleById(id);
    if(vehicle){
      let updated = await this._VehicleService.update(vehicle, updates);
      return updated;
    }

    throw new Error("Vehiculo no encontrado");
  }

  public async delete (id: number) {
    const vehicle = await this._VehicleService.getVehicleById(id);
    if(vehicle){
      let deleted = await this._VehicleService.delete(vehicle);
      return deleted;
    }

    throw new Error("Vehiculo no encontrado");
  }

}
