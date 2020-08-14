import { MapProp } from 'ts-simple-automapper';

export class CommentDTO {
  @MapProp()
  id: number;

  @MapProp()
  comment_body: string;

  @MapProp()
  owner: string;

  @MapProp()
  email: string;

  @MapProp()
  cel: string;

  @MapProp()
  vehicle: number;
}