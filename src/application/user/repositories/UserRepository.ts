import { EntityRepository, Repository, FindManyOptions } from 'typeorm';
import { User } from '../../../database/entities/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public getById = async (id: number): Promise<User|undefined> =>
    await this.manager.getRepository(User).findOne({ id });

  public getAll = async (query: FindManyOptions<User> = {}): Promise<User[]> =>
    await this.manager.getRepository(User).find(query);

  public updateUser = async (user: User, updates: any): Promise<User|undefined> =>
    this.manager.getRepository(User).merge(user, updates);

  public deleteUser = async (id: number) => 
    this.manager.getRepository(User).delete({ id });

  public getByEmail = async (term: string): Promise<User|undefined> => 
  await this.manager.getRepository(User).findOne({
    where: [{ email: term}]
  });

  public getByToken = async(token: string): Promise<User|undefined> =>
    await this.manager.getRepository(User).findOne({ token });

  public getUserWithAccountInfo = async (id: number) =>
    await this.manager.getRepository(User).findOne({ id })

  public activateAccount = async(user: User, status: boolean) =>
    this.manager.getRepository(User).merge(user, {status});
}
