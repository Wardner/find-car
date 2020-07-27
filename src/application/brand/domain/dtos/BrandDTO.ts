import { MapProp } from 'ts-simple-automapper';

export class BrandDTO {
  @MapProp()
  id: number;

  @MapProp()
  name: string;
}