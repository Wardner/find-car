import { User } from '../../../database/entities/User';
import { UserMapper } from '../domain/mappers/UserMapper';
import { UserDTO } from '../domain/dtos/UserDTO';
import { UserRepository } from '../repositories/UserRepository';

export class UserService {
  constructor(
    private _UserRepository: UserRepository,
    private _UserMapper: UserMapper
  ) {}

  public mapToEntity = async (userPayload: UserPayload): Promise<User> =>
    await this._UserMapper.mapToEntity(userPayload);

  public getUserById = async (id: number) =>
    this._UserRepository.getById(id);

  public async getAllUsers () {
    const users = await this._UserRepository.getAll();
    return users;
  }

  public create = async (userEntity: User) => {
    return await this._UserRepository.save(userEntity).then(user => 
      this._UserMapper.mapToDTO(user));
  }

  public async update (user: User, updates: {}) {
    const updated = await this._UserRepository.updateUser(user, updates);
    return await this._UserRepository.save(updated as User);
  }

  public async delete (user: User) {
    let { id } = user;
    const deleted = await this._UserRepository.deleteUser(id);
    return deleted;
  }
}