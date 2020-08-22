import { Report } from '../../../database/entities/Report';
import { ReportDTO } from '../domain/dtos/ReportDTO';
import { ReportMapper } from '../domain/mappers/ReportMapper';
import { ReportRepository } from '../repositories/ReportRepository';

export class ReportService {
  constructor(
    private _ReportRepository: ReportRepository,
    private _ReportMapper: ReportMapper 
  ) {}

  public mapToEntity = async(reportPayload: ReportPayload): Promise<Report> =>
    await this._ReportMapper.mapToEntity(reportPayload);

  public getById = async(id: number) =>
    await this._ReportRepository.getById(id);

  public async create(reportEntity: Report) {
    return await this._ReportRepository.save(reportEntity).then(report =>
      this._ReportMapper.mapToDTO(report));
  }
}
