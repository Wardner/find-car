import { EntityRepository, Repository, FindManyOptions } from 'typeorm';
import { Comment } from '../../../database/entities/Comment';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  public getById = async(id: number): Promise<Comment|undefined> =>
    await this.manager.getRepository(Comment).findOne({ id });

  public delete = async(id: number) =>
    await this.manager.getRepository(Comment).delete({ id });
}

