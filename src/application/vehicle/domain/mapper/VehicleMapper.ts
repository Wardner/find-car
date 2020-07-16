import { Mapper } from 'ts-simple-automapper';
import { VehicleDTO } from '../dtos/VehicleDTO';
import { Vehicle } from '../../../../database/entities/Vehicle';
import { VehicleRepository } from '../../repositories/VehicleRepository';

export class VehicleMapper {
  constructor(private _VehicleRepository: VehicleRepository) {}

  public mapToDTO(from: Vehicle): VehicleDTO {
    const vehicleDTO: VehicleDTO = new Mapper().map(from, new VehicleDTO());
    return vehicleDTO;
  } 

  public mapToEntity = async(from: VehiclePayload): Promise<Vehicle> =>
    this._VehicleRepository.create(from as Vehicle);

  public mapListToDTO(vehicles: Vehicle[]): VehicleDTO[] {
    return vehicles.map(vehicle => this.mapToDTO(vehicle));
  }
}