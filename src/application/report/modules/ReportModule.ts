import { getCustomRepository } from 'typeorm';
import { ReportController } from '../controllers/ReportController';
import { ReportService } from '../services/ReportService';
import { ReportRepository } from '../repositories/ReportRepository';
import { ReportMapper } from '../domain/mappers/ReportMapper';
import { EmailService } from '../../../workers/EmailService/EmailService';
import { VehicleRepository } from '../../vehicle/repositories/VehicleRepository';
import { UserRepository } from '../../user/repositories/UserRepository';

export class ReportModule {
  //Repositories
  private _reportRepository: ReportRepository;
  private _vehicleRepository: VehicleRepository;
  private _userRepository: UserRepository;

  //Mappers
  private _reportMapper: ReportMapper;

  //Services
  private _reportService: ReportService;
  private _emailService: EmailService

  //Controllers
  private _reportController: ReportController;


  get reportRepository(): ReportRepository {
    return !this._reportRepository ?
      (this._reportRepository = getCustomRepository(ReportRepository))
    : this._reportRepository
  }

  get vehicleRepository(): VehicleRepository {
    return !this._vehicleRepository ?
      (this._vehicleRepository = getCustomRepository(VehicleRepository))
    : this._vehicleRepository
  }

  get userRepository(): UserRepository {
    return !this._userRepository ?
      (this._userRepository = getCustomRepository(UserRepository))
    : this._userRepository
  }

  get reportMapper(): ReportMapper {
    return !this._reportMapper ?
      (this._reportMapper = new ReportMapper(this.reportRepository))
    : this._reportMapper
  }

  get emailService(): EmailService {
    return !this._emailService ?
      (this._emailService = new EmailService()) : this._emailService
  }

  get reportService(): ReportService {
    return !this._reportService ?
      (this._reportService = new ReportService(
        this.reportRepository,
        this.reportMapper
      )) : this._reportService
  }

  get controller(): ReportController {
    return !this._reportController ?
      (this._reportController = new ReportController(this.reportService, this.emailService, this.vehicleRepository, this.userRepository))
    : this._reportController
  }
}

export const reportModule = new ReportModule();