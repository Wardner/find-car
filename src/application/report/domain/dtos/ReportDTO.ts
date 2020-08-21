import { MapProp } from 'ts-simple-automapper';

export class ReportDTO {
  @MapProp()
  id: number;

  @MapProp()
  report_body: string;

  @MapProp()
  owner: string;

  @MapProp()
  vehicle: number;

  @MapProp()
  user: number;
}