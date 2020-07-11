import { Vehicle } from '../../../database/entities/Vehicle';
import { VehicleMapper } from '../domain/mapper/VehicleMapper';
import { VehicleDTO } from '../domain/dtos/VehicleDTO';
import { VehicleRepository } from '../repositories/VehicleRepository';

export class VehicleService {
  constructor(
    private _VehicleRepository: VehicleRepository,
    private _VehicleMapper: VehicleMapper
  ) {}

  public mapToEntity = async(vehiclePayload: VehiclePayload): Promise<Vehicle> =>
    await this._VehicleMapper.mapToEntity(vehiclePayload);

  public async getAllVehicles() {
    const vehicles =  await this._VehicleRepository.getAll();
    return vehicles;
  }

  public create = async(vehicleEntity: Vehicle) => {
    return await this._VehicleRepository.save(vehicleEntity).then(vehicle =>
      this._VehicleMapper.mapToDTO(vehicle));
  }

  public async update (vehicle: Vehicle, updates: {}) {
    const updated = await this._VehicleRepository.updateVehicle(vehicle, updates);
    return await this._VehicleRepository.save(updated as Vehicle);
  }

  public async delete(vehicle: Vehicle) {
    let { id } = vehicle;
    const deleted = await this._VehicleRepository.deleteVehicle(id);
    return deleted;
  }

}