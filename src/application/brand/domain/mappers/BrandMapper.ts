import { Mapper } from 'ts-simple-automapper';
import { Brand } from '../../../../database/entities/Brand';
import { BrandRepository } from '../../repositories/BrandRepository';
import { BrandDTO } from '../dtos/brandDTO';

export class BrandMapper {
  constructor(private _BrandRepository: BrandRepository) {}
  
  public mapToDTO(from: Brand): BrandDTO {
    const brandDTO: BrandDTO = new Mapper().map(from, new BrandDTO());
    return brandDTO;
  }

  public mapToEntity = async(from: BrandPayload): Promise<Brand> =>
    this._BrandRepository.create(from as Brand);

  public mapListToDTO(brands: Brand[]): BrandDTO[] {
    return brands.map(brand => this.mapToDTO(brand));
  }

}


