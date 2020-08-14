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

  @Column({nullable: true})
  owner: string

  @Column({nullable: true})
  email: string

  @Column({nullable: true})
  cel: string

  @ManyToOne(type => User, user => user.id)
  user: number;

  @ManyToOne(type => Vehicle, vehicle => vehicle.id)
  vehicle: number;
}
