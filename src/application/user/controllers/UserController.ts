import { UserService, UserDTO } from '../providers/UserProvider';
import { User } from '../../../database/entities/User';
import { JWToken } from '../../../infrastructure/utils/JWTokens';
import { EmailService } from '../../../workers/EmailService/EmailService';
import { UserResponses } from '../utils/UserResponses';

export class UserController {
  constructor(
    private _UserService: UserService,
    private _EmailService: EmailService
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
    const userExist = await this._UserService.getUserByUsername(user.username as string);

    if(userExist)
      throw new Error("BAD REQUEST. Username Exist");

    let created = await this._UserService.create(user as User);

    if(created){
      await this._EmailService.build({
        to: user.email as string,
        subject: UserResponses.EMAIL_SENT
      }, {url: `http://localhost:4000/api/user/activate/${created?.token}`});
    }
    
    return await JWToken.generateToken(created);
    // throw new Error("No se creo el usuario");
  }

  public async update (id: number, updates: {}) {
    const user = await this._UserService.getUserById(id);
    if(user){
      let updated = await this._UserService.update(user, updates);
      return updated;
    }

    throw new Error("Usuario no encontrado");
  }

  public async activate(token: string, status: boolean) {
    const user = await this._UserService.getUserByToken(token);
    if(user){
      let updated = await this._UserService.activateAccount(user, status)
      return updated;
    }
    throw new Error("Crypto no encontrado");
  }

  public async delete (id: number) {
    const user = await this._UserService.getUserById(id);
    if(user){
      let deleted = await this._UserService.delete(user)
      return deleted;
    }

    throw new Error("Usuario no encontrado");
  }

  public async getUsername(username: string) {
    const user = await this._UserService.getUserByUsername(username);
    if(user)
      return user;
    
    throw new Error("Usuario no Encontrado");
  }

  public login = async(user: { emailOrUsername: string, password: string }) => {
    const account = await this._UserService.getUserByEmailOrUsername(user.emailOrUsername);
    if(account?.status){
      return await this._UserService.login(user.emailOrUsername, user.password)
        .then(async userLogged => await JWToken.generateToken(userLogged));
    }

    throw new Error("Revise su correo para activar su cuenta");
  }
}
