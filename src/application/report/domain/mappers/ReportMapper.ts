import { Mapper } from 'ts-simple-automapper';
import { ReportDTO } from '../dtos/ReportDTO';
import { Report } from '../../../../database/entities/Report';
import { ReportRepository } from '../../repositories/ReportRepository';

export class ReportMapper {
  constructor(private _ReportRepository: ReportRepository) {}

  public mapToDTO(from: Report): ReportDTO {
    const reportDTO: ReportDTO = new Mapper().map(from, new ReportDTO());
    return reportDTO;
  }

  public mapToEntity = async (from: ReportPayload): Promise<Report> =>
    this._ReportRepository.create(from as Report);
    
  public mapListToDTO(reports: Report[]): ReportDTO[] {
    return reports.map(report => this.mapToDTO(report));
  }
}