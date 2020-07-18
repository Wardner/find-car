import { MapProp } from 'ts-simple-automapper';

export class CommentDTO {
  @MapProp()
  id: number;

  @MapProp()
  comment_body: string;

  @MapProp()
  vehicle: number;
}