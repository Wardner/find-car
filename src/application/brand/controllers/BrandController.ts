import { BrandDTO, BrandService, Brand } from '../providers/BrandProvider';

export class BrandController {
  constructor(
    private _BrandService: BrandService
  ) {}

  public async getAll() {
    const brands = await this._BrandService.getAllBrands();
    if(brands)
      return brands;

    throw new Error("Marcas No Encontradas")
  }

  public async getById(id: number) {
    const brand = await this._BrandService.getBrandById(id);
    if(!brand)
      throw new Error("Marca No Encontrada")

    return brand;
  }

  public async create(brandPayload: BrandPayload | any) {
    const brand = await this._BrandService.mapToEntity(brandPayload);

    let created = await this._BrandService.create(brand as Brand);

    if(created)
      return created;

    throw new Error("No se pudo crear la marca");
  }

  public async update(id: number, updates: {}) {
    const brand = await this._BrandService.getBrandById(id);
    if(brand){
      let updated = await this._BrandService.update(brand, updates);
      return updated;
    }

    throw new Error("No se hallo la marca");
  }

  public async delete(id: number) {
    const brand = await this._BrandService.getBrandById(id);
    if(brand){
      let deleted = await this._BrandService.delete(brand);
      return deleted;
    }

    throw new Error("No se hallo la marca")
  }

}