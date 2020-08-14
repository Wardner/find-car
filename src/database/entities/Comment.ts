import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../baseEntities/BaseEntity';
import { User } from './User';
import { Vehicle } from './Vehicle';


@Entity({ name: 'comment' })
export class Comment extends BaseEntity {
  @Column({
    name: 'comment_body'
  })
  comment_body: string;

  @Column()
  owner: string

  @Column()
  email: string

  @Column()
  cel: string

  @ManyToOne(type => User, user => user.id)
  user: number;

  @ManyToOne(type => Vehicle, vehicle => vehicle.id)
  vehicle: number;
}
