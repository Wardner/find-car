import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../../database/entities/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public getById = async (id: number): Promise<User|undefined> =>
    await this.manager.getRepository(User).findOne({ id });

  public getAll = async (): Promise<User[]> =>
    await this.manager.getRepository(User).find();

  public updateUser = async (user: User, updates: any): Promise<User|undefined> =>
    this.manager.getRepository(User).merge(user, updates);

  public deleteUser = async (id: number) => 
    this.manager.getRepository(User).delete({ id });
}
