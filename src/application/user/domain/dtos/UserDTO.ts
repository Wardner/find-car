import { MapProp } from 'ts-simple-automapper';

export class UserDTO {
  @MapProp()
  id: number;

  @MapProp()
  name: string;

  @MapProp()
  lastname: string;

  @MapProp()
  email: string;

  @MapProp()
  dni: string;

  @MapProp()
  age: number;

  @MapProp()
  cel: string;
  
  @MapProp()
  status: boolean;
}




