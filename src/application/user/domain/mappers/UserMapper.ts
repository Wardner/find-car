import { Mapper } from 'ts-simple-automapper';
import { UserDTO } from '../dtos/UserDTO';
import { UserRepository } from '../../repositories/UserRepository';
import { User } from '../../../../database/entities/User';

export class UserMapper {
  constructor(private _UserRepository: UserRepository) {}

  public mapToDTO(from: User): UserDTO {
    const userDTO: UserDTO = new Mapper().map(from, new UserDTO());
    return userDTO;
  }

  public mapToEntity = async (from: UserPayload): Promise<User> =>
    this._UserRepository.create(from as User);
}
