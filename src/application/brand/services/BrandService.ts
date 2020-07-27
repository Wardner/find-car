import { Brand, BrandRepository, BrandDTO, BrandMapper } from '../providers/BrandProvider'


export class BrandService {
  constructor(
    private _BrandRepository: BrandRepository,
    private _BrandMapper: BrandMapper
  ) {}

  public mapToEntity = async(brandPayload: BrandPayload): Promise<Brand> =>
    await this._BrandMapper.mapToEntity(brandPayload);

  public async getAllBrands() {
    const brands = await this._BrandRepository.getAll().then(brand =>
      this._BrandMapper.mapListToDTO(brand));
      return brands;
  }

  public getBrandById = async(id: number) => 
    await this._BrandRepository.getById(id);

  public create = async(brandEntity: Brand) => {
    return await this._BrandRepository.save(brandEntity).then(brand =>
      this._BrandMapper.mapToDTO(brand));
  }

  public async update(brand: Brand, updates: {}) {
    const updated = await this._BrandRepository.updateBrand(brand, updates);
    return await this._BrandRepository.save(updated as Brand);
  }

  public async delete(brand: Brand) {
    let { id } = brand;
    const deleted = await this._BrandRepository.deleteBrand(id);
    return deleted;
  }
    
}
