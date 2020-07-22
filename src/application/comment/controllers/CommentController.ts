import { Comment } from '../../../database/entities/Comment';
import { CommentDTO } from '../domain/dtos/CommentDTO';
import { CommentService } from '../services/CommentService';

export class CommentController {
  constructor(
    private _CommentService: CommentService
  ) {}

  public async getById(id: number) {
    const comment = await this._CommentService.getCommentById(id);
    if(!comment)
      throw new Error("Comment not found");
    
    return comment;
  }

  public async create(commentPayload: CommentPayload | any) {
    const comment = await this._CommentService.mapToEntity(commentPayload);
    
    let created = await this._CommentService.create(comment as Comment);

    if(created)
      return created;

    throw new Error("Comment not created");
  }

  public async delete(id: number) {
    const comment = await this._CommentService.getCommentById(id);
    if(comment){
      let deleted = await this._CommentService.delete(comment);
      return deleted;
    }

    throw new Error("Comment not found");
  }

}