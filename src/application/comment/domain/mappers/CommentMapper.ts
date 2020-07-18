import { Mapper } from 'ts-simple-automapper';
import { CommentDTO } from '../dtos/CommentDTO';
import { Comment } from '../../../../database/entities/Comment';
import { CommentRepository } from '../../repositories/CommentRepository';

export class CommentMapper {
  constructor(private _CommentRepository: CommentRepository) {}

  public mapToDTO(from: Comment): CommentDTO {
    const commentDTO: CommentDTO = new Mapper().map(from, new CommentDTO());
    return commentDTO;
  }

  public mapToEntity = async (from: CommentPayload): Promise<Comment> =>
    this._CommentRepository.create(from as Comment);
    
  public mapListToDTO(comments: Comment[]): CommentDTO[] {
    return comments.map(comment => this.mapToDTO(comment));
  }
  
}