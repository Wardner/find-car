import { CommentRepository } from '../repositories/CommentRepository';
import { Comment } from '../../../database/entities/Comment';
import { CommentDTO } from '../domain/dtos/CommentDTO';
import { CommentMapper } from '../domain/mappers/CommentMapper';

export class CommentService {
  constructor(
    private _CommentRepository: CommentRepository,
    private _CommentMapper: CommentMapper 
  ) {}

  public mapToEntity = async(commentPayload: CommentPayload): Promise<Comment> =>
    await this._CommentMapper.mapToEntity(commentPayload);

  public getCommentById = async(id: number) =>
    await this._CommentRepository.getById(id);

  public async delete(comment: Comment) {
    let { id } = comment;
    const deleted = await this._CommentRepository.delete(id);
    return deleted;
  }  

  public async create(commentEntity: Comment) {
    return await this._CommentRepository.save(commentEntity).then(comment =>
      this._CommentMapper.mapToDTO(comment));
  }
}
