import { EntityRepository, Repository } from 'typeorm';
import { Vehicle } from '../../../database/entities/Vehicle';

@EntityRepository(Vehicle)
export class VehicleRepository extends Repository<Vehicle> {
  public getAll = async(): Promise<Vehicle[]> =>
    await this.manager.getRepository(Vehicle).find();

  public updateVehicle = async(vehicle: Vehicle, updates: any): Promise<Vehicle|undefined> =>
    this.manager.getRepository(Vehicle).merge(vehicle, updates);

  public deleteVehicle = async(id: number) =>
    this.manager.getRepository(Vehicle).delete({ id });
}
