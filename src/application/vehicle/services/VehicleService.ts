import { Vehicle } from '../../../database/entities/Vehicle';
import { VehicleMapper } from '../domain/mapper/VehicleMapper';
import { VehicleDTO } from '../domain/dtos/VehicleDTO';
import { deleteUploadedFiles } from '../../../infrastructure/utils/deleteUploadedFiles';
import { VehicleRepository } from '../repositories/VehicleRepository';
import { cloud } from '../../../infrastructure/utils/Cloudinary';
import { url } from 'inspector';

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
    this._VehicleRepository.getById(id);

  public getVehicleByIdC = async(id: number) =>
    this._VehicleRepository.getByIdC(id);

  public create = async(vehicleEntity: Vehicle) => {    
    return await this._VehicleRepository.save(vehicleEntity).then(vehicle =>
      this._VehicleMapper.mapToDTO(vehicle))
  }

  public async update (vehicle: Vehicle, updates: {}) {
    const updated = await this._VehicleRepository.updateVehicle(vehicle, updates)
    return await this._VehicleRepository.save(updated as Vehicle);
  }

  public async delete(vehicle: Vehicle) {
    let { id } = vehicle;
    const deleted = await this._VehicleRepository.deleteVehicle(id);
    return deleted;
  }

  public async upload(vehicle: Vehicle, pictures: {path: string, name: string}[]) {
    if(vehicle) {

      let picture = await this.cloudinaryUp(pictures);


      const updatePicture = await this._VehicleRepository.updateVehicle(vehicle, picture)
      if(updatePicture) {
        await this._VehicleRepository.save(updatePicture)
        // await deleteUploadedFiles(picture)
          
        return {
          updatePicture
        }
      }

    }
    
    throw new Error("Vehicle not found, al subir imagenes") 
  }

  public async uploadC(vehicle: Vehicle, pictures: {path: string, name: string}[]): Promise<Vehicle> {
    if(!vehicle){
      throw new Error("Vehicle not found, al subir imagenes")
    }
    
    // if(vehicle) {
      const uploaded = async(path: string) => cloud.upload(path, {
        folder: 'vehicles',
        width: 1080,
        crop: 'limit',
        format: 'jpg'
      });
      
      pictures.forEach(async picture => {
        const up = await uploaded(picture.path);
        const updatePicture = await this._VehicleRepository.updateVehicle(vehicle, {
          picture: [
            ...vehicle.picture,
            {
              url: up.secure_url,
              id: up.public_id
            }
          ]
        })
      // const updatePicture = await this._VehicleRepository.updateVehicle(vehicle, { picture })
        
        if(updatePicture) {
          await this._VehicleRepository.save(updatePicture)
          // await deleteUploadedFiles(pictures)  
          return updatePicture;
        }
      })
    // }
      return vehicle;
  }

  public async cloudinaryUp(data: {path: string, name: string}[]) {
    const uploaded = async(path: string) => cloud.upload(path, {
      folder: 'vehicles',
      width: 1080,
      crop: 'limit',
      format: 'jpg'
    });

    // const values: {url: string, id: string}[] = [];
    
    // data.map(async vehiclePicture => {
    //   let up = await uploaded(vehiclePicture.path)
    //   values.push({ url: up.secure_url, id: up.public_id });
    //   console.log('vueltas');
    // })

    return Promise.all(data.map(async vehiclePicture =>
      uploaded(vehiclePicture.path).then(({ secure_url: url, public_id: id }) => ({ url, id }))))
    
  }

}