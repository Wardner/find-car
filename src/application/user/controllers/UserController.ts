import { UserService, UserDTO } from '../providers/UserProvider';
import { User } from '../../../database/entities/User';
import { JWToken } from '../../../infrastructure/utils/JWTokens';

export class UserController {
  constructor(
    private _UserService: UserService
  ) {}

  public async getById (id: number) {
    const user = await this._UserService.getUserById(id);
    if(!user)
      throw new Error ('No se encontraron usuarios');

    return user;
  }

  public async getAll() {
    const users = await this._UserService.getAllUsers();
    if(users)
      return users;
    
    throw new Error("Usuarios no encontrados");
  }

  public async create (userPayload: UserPayload | any) {
    const user = await this._UserService.mapToEntity(userPayload);
    const userExist = await this._UserService.getUserById(user.id);

    if(userExist)
      throw new Error("BAD REQUEST. User ID Exist");

    let created = await this._UserService.create(user as User);

    if(created)
      return await JWToken.generateToken(created);

    throw new Error("No se creo el usuario");
  }

  public async update (id: number, updates: {}) {
    const user = await this._UserService.getUserById(id);
    if(user){
      let updated = await this._UserService.update(user, updates);
      return updated;
    }

    throw new Error("Usuario no encontrado");
  }

  public async delete (id: number) {
    const user = await this._UserService.getUserById(id);
    if(user){
      let deleted = await this._UserService.delete(user)
      return deleted;
    }

    throw new Error("Usuario no encontrado");
  }

}
