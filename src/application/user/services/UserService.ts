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
    await this._UserRepository.getById(id);

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

  public getUserByEmail = async(email: string) =>
    await this._UserRepository.getByEmail(email);

  public async login(email: string, password: string): Promise<UserDTO> {
    const user = await this._UserRepository.getByEmail(email);
    if(!user) 
      throw new Error("Usuario no Encontrado");

    const matchpassword = await user.comparePassword(password);

    if(matchpassword)
      return this._UserMapper.mapToDTO(user);
    
    throw new Error("Unauthorized")
  }

  public getUserByToken = async(token: string) =>
    await this._UserRepository.getByToken(token);

  public async activateAccount(user: User, isActive: boolean) {
    const updated = await this._UserRepository.activateAccount(user, isActive);
    return await this._UserRepository.save(updated as User);
  }

  // public getUserWithAccountInfo = async (userId: number) =>
  //   await this._UserRepository.getUserWithAccountInfo(userId).then(user => {
  //     const account = user?.role === Roles.SCHOOL ?
  //       this._SchoolMapper.mapToDTO(user?.school as School) : null

  //     return this._UserMapper.mapToDTO({ ...user, account } as User)
  //   })

}