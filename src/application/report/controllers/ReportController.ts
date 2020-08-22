import { Report } from '../../../database/entities/Report';
import { ReportDTO } from '../domain/dtos/ReportDTO';
import { ReportService } from '../services/ReportService';
import { EmailService } from '../../../workers/EmailService/EmailService';
import { VehicleRepository } from '../../vehicle/repositories/VehicleRepository';
import { UserRepository } from '../../user/repositories/UserRepository';
import { UserResponses } from '../../user/utils/UserResponses';


export class ReportController {
  constructor(
    private _ReportService: ReportService,
    private _EmailService: EmailService,
    private _VehicleRepository: VehicleRepository,
    private _UserRepository: UserRepository
  ) {}
  
  public async getById(id: number) {
    const report = await this._ReportService.getById(id);

    if(!report)
      throw new Error("Report not found");
    
    return report;
  }

  public async create(reportPayload: ReportPayload | any) {
    const report = await this._ReportService.mapToEntity(reportPayload);
    
    let created = await this._ReportService.create(report as Report);

    let vehicle = await this._VehicleRepository.getByIdC(created.vehicle);
    let user = await this._UserRepository.getById(vehicle?.userId as number);

    if(created){
      await this._EmailService.build({
        to: user?.email as string,
        subject: UserResponses.EMAIL_SENT,
        template: 'reportedVehicle'
      }, {url: `https://findcars.herokuapp.com/`});
      
      return created;
    }

    throw new Error("Report not created");
  }

}