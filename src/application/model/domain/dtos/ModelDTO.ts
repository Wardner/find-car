import { MapProp } from 'ts-simple-automapper';

export class ModelDTO {
  @MapProp()
  id: number;

  @MapProp()
  name: string;
}