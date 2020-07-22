import { Vehicle } from '../../../database/entities/Vehicle';
import { VehicleMapper } from '../domain/mapper/VehicleMapper';
import { VehicleDTO } from '../domain/dtos/VehicleDTO';
import { deleteUploadedFiles } from '../../../infrastructure/utils/deleteUploadedFiles';
import { VehicleRepository } from '../repositories/VehicleRepository';
import { cloud } from '../../../infrastructure/utils/Cloudinary';

export class VehicleService {
  constructor(
    private _VehicleRepository: VehicleRepository,
    private _VehicleMapper: VehicleMapper
  ) {}

  public mapToEntity = async(vehiclePayload: VehiclePayload): Promise<Vehicle> =>
    await this._VehicleMapper.mapToEntity(vehiclePayload);

  public async getAllVehicles() {
    const vehicles =  await this._VehicleRepository.getAll().then(vehicle =>
      this._VehicleMapper.mapListToDTO(vehicle));
    return vehicles;
  }

  public getVehicleById = async(id: number) => 
    await this._VehicleRepository.getById(id);

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

  public async upload(vehicle: Vehicle, picture: { path: string, name: string }) {
    if(vehicle) {
      const uploaded = await cloud.upload(picture.path, {
        folder: 'vehicles',
        width: 200,
        crop: 'limit',
        format: 'jpg'
      });
      
      if(vehicle.picture && vehicle.picture.id)
      await cloud.destroy(vehicle.picture.id)
      
      const updatePicture = await this._VehicleRepository.updateVehicle(vehicle, {
        picture: {
          url: uploaded.secure_url,
          id: uploaded.public_id
        }
      });
      if(updatePicture) {
        await this._VehicleRepository.save(updatePicture)
        await deleteUploadedFiles(picture.name)

        return {
          picture: updatePicture.picture
        }
      }
    }

    await deleteUploadedFiles(picture.name)
    throw new Error("Vehicle not found, al subir imagenes")
  }

}