import { VehicleDTO, VehicleService } from '../providers/VehicleProvider';
import { Vehicle } from '../../../database/entities/Vehicle';
import path from 'path';
import { statusCodes } from 'src/infrastructure/routes/statusCodes';
import { ResponseHandler } from 'src/infrastructure/routes/ResponseHandler';
import fs from 'fs';

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
    // const vehicleExist = await this._VehicleService.getVehicleById(vehicle.id as number);
    // if(vehicleExist)
    //   throw new Error("BAD REQUEST. Vehicle Exist");

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

  public async upload(props: {
    id: number,
    picture: string[]
  }) {
    const { id, picture } = props;
    const vehicle = await this._VehicleService.getVehicleById(id);
    if(vehicle) {
      return await this._VehicleService.upload(vehicle as Vehicle, picture)
    }

    throw new Error("UNAUTHORIZED, No esta autorizado a subir fotos en este post");
  }

  public async getPic(filename: string) {
    try {
      const picture = path.resolve(__dirname, `../../../../uploads/${filename}`)
      if(fs.existsSync(picture)) {
        return (path.resolve(picture))
      }
      else {
        throw new Error("No se hallo la imagen")
      }
    } catch(e){
      throw new Error(e.message);
    }
  }

}