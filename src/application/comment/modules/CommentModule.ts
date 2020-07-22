import { getCustomRepository } from 'typeorm';
import { CommentController, CommentRepository, CommentService, CommentMapper } from '../providers/CommentProvider';

export class CommentModule {
  //Repositories
  private _commentRepository: CommentRepository;

  //Mappers
  private _commentMapper: CommentMapper;

  //Services
  private _commentService: CommentService;

  //Controllers
  private _commentController: CommentController;


  get commentRepository(): CommentRepository {
    return !this._commentRepository ?
      (this._commentRepository = getCustomRepository(CommentRepository))
    : this._commentRepository
  }

  get commentMapper(): CommentMapper {
    return !this._commentMapper ?
      (this._commentMapper = new CommentMapper(this.commentRepository))
    : this._commentMapper
  }

  get commentService(): CommentService {
    return !this._commentService ?
      (this._commentService = new CommentService(
        this.commentRepository,
        this.commentMapper
      )) : this._commentService
  }

  get controller(): CommentController {
    return !this._commentController ?
      (this._commentController = new CommentController(this.commentService))
    : this._commentController
  }
}

export const commentModule = new CommentModule();
