import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../baseEntities/BaseEntity';
import { User } from './user';
import { Vehicle } from './Vehicle';


@Entity({ name: 'comment' })
export class Comment extends BaseEntity {
  @Column({
    name: 'comment_body'
  })
  comment_body: string;

  @ManyToOne(type => User, user => user.comment)
  user: User;

  @ManyToOne(type => Vehicle, vehicle => vehicle.comment)
  vehicle: Vehicle;
}

