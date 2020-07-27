import { EntityRepository, Repository, FindManyOptions } from 'typeorm';
import { Brand } from '../providers/BrandProvider';

@EntityRepository(Brand)
export class BrandRepository extends Repository<Brand> {
  public getAll = async(): Promise<Brand[]> =>
    await this.manager.getRepository(Brand).find();
  
  public getById = async(id: number): Promise<Brand|undefined> =>
    await this.manager.getRepository(Brand).findOne({ id });

  public deleteBrand = async(id: number) =>
    await this.manager.getRepository(Brand).delete({ id });

  public updateBrand = async(brand: Brand, updates: any): Promise<Brand|undefined> =>
    this.manager.getRepository(Brand).merge(brand, updates);
} 
