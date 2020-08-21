import { VehicleService } from '../providers/VehicleProvider';
import { Vehicle } from '../../../database/entities/Vehicle';
import path from 'path';
import fs from 'fs';
import { StadisticRepository } from '../repositories/StadisticRepository';
import { BrandService } from '../../brand/services/BrandService';

export class VehicleController {
  constructor(
    private _VehicleService: VehicleService,
    private _BrandService: BrandService,
    private _StadisticRepository: StadisticRepository
  ) {}

  public async getAll() {
    const vehicles = await this._VehicleService.getAllVehicles();
    const sectors = JSON.parse(fs.readFileSync('src/database/sectores.json', 'utf-8'));
    vehicles.map(vehicle => {
      const sector = sectors.filter(sector => {
        return sector.sector_id == vehicle.sectorid;
      });
      vehicle.sectorid = sector;
    })
    
    if(vehicles)
        return vehicles;
    
    throw new Error("Vehiculos no encontrados")
  }

  public async getById(id: number) {
    const vehicle = await this._VehicleService.getVehicleById(id);
    if(!vehicle)
      throw new Error("Vehiculo no encontrado");

    return vehicle;
  }

  public async create(vehiclePayload: VehiclePayload | any, data: {path: string, name: string}[]) {
    const vehicle = await this._VehicleService.mapToEntity(vehiclePayload);
    const sectors = JSON.parse(fs.readFileSync('src/database/sectores.json', 'utf-8'));
    let sector = sectors.filter(sector => {
      return sector.sector_id == vehicle.sectorid;
    });

    let brand = await this._BrandService.getBrandById(vehicle.brand);
    
    let stadistic = {
      sectorid: sector[0].sector_id,
      sector: sector[0].sector,
      brandid: brand?.id,
      brand: brand?.name
    }

    let pictures = await this._VehicleService.cloudinaryUp(data);
    
    vehicle.picture = pictures;
    let created = await this._VehicleService.create(vehicle as Vehicle);
    
    try{
      await this._StadisticRepository.save(stadistic);
    } catch(e) {
      throw new Error(e.message);
    }

    if(created){
      return created;
    }

    throw new Error("No se creo el vehiculo");
  }

  public async update (id: number, updates: {}) {
    const vehicle = await this._VehicleService.getVehicleByIdC(id);
    if(vehicle){
      let updated = await this._VehicleService.update(vehicle, updates);
      return await this._VehicleService.getVehicleById(updated.id);
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

  public async uploadC(props: {
    id: number,
    picture: {path: string, name: string}[]
  }): Promise<Vehicle> {
    const { id, picture } = props;
    const vehicle = await this._VehicleService.getVehicleByIdC(id);
    if(vehicle) {
      return await this._VehicleService.uploadC(vehicle, picture)
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

  public async dataCount() {
    const sectors = await this._StadisticRepository.dataCountSector();
    const brands = await this._StadisticRepository.dataCountBrand();

    return { sectors, brands };
  }

}