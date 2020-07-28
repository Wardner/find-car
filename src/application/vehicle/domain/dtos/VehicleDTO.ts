import { MapProp } from 'ts-simple-automapper';

export class VehicleDTO {
  @MapProp()
  id: number;

  @MapProp()
  brand: number;

  @MapProp()
  model: number;

  @MapProp()
  plate: string;

  @MapProp()
  niv: string;

  @MapProp()
  color: string;

  @MapProp()
  year: number;

  @MapProp()
  lostlocation: string;

  @MapProp()
  date: Date;

  // @MapProp()
  // picture: string[];

  @MapProp()
  description: string;

  @MapProp()
  pub_status: string;

  @MapProp()
  user: number;
}