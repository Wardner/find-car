import { getCustomRepository } from 'typeorm'
import { UserController, UserMapper, UserRepository, UserService } from '../providers/UserProvider'
import { EmailService } from '../../../workers/EmailService/EmailService'


export class UserModule {
  //Repositories
  private _userRepository: UserRepository

  //Mappers
  private _userMapper: UserMapper

  //Services
  private _userService: UserService
  private _emailService: EmailService

  //Controllers
  private _userController: UserController


  get userRepository(): UserRepository {
    return !this._userRepository ?
      (this._userRepository = getCustomRepository(UserRepository))
    : this._userRepository
  }

  get userMapper(): UserMapper {
    return !this._userMapper ?
      (this._userMapper = new UserMapper(this.userRepository))
    : this._userMapper
  }

  get userService(): UserService {
    return !this._userService ?
      (this._userService = new UserService(
        this.userRepository,
        this.userMapper
      )) : this._userService
  }

  get emailService(): EmailService {
    return !this._emailService ?
      (this._emailService = new EmailService()) : this._emailService
  }

  get controller(): UserController {
    return !this._userController ?
      (this._userController = new UserController(this.userService, this.emailService))
    : this._userController
  }
}

export const userModule = new UserModule();
