import { getCustomRepository } from 'typeorm';
import { BrandController, BrandMapper, BrandRepository, BrandService } from '../providers/BrandProvider';

export class BrandModule {
  //Repositories
  private _brandRepository: BrandRepository

  //Mappers
  private _brandMapper: BrandMapper

  //Services
  private _brandService: BrandService

  //Controllers
  private _brandController: BrandController


  get brandRepository(): BrandRepository {
    return !this._brandRepository ?
      (this._brandRepository = getCustomRepository(BrandRepository))
    : this._brandRepository
  }

  get brandMapper(): BrandMapper {
    return !this._brandMapper ?
      (this._brandMapper = new BrandMapper(this.brandRepository))
    : this._brandMapper
  }

  get brandService(): BrandService {
    return !this._brandService ?
      (this._brandService = new BrandService(
        this.brandRepository,
        this.brandMapper
      )) : this._brandService
  }

  get controller(): BrandController {
    return !this._brandController ?
      (this._brandController = new BrandController(this.brandService))
    : this._brandController
  }
}

export const brandModule = new BrandModule();
