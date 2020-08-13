import { Entity, Column, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../baseEntities/BaseEntity';
import { User } from './User';
import { Comment } from './Comment';
import { Report } from './Report';
import { Brand } from './Brand';
import { Model } from './Model';

enum status {
  blocked = 'blocked',
  public = 'public',
  recovered = 'recovered'
}

@Entity({ name: 'vehicle' })
export class Vehicle extends BaseEntity {
  @ManyToOne(type => Brand, brand => brand.id)
  @JoinColumn()
  brand: number;

  @ManyToOne(type => Model, model => model.id)
  @JoinColumn()
  model: number;

  @Column({
    name: 'plate',
    unique: true
  })
  plate: string;

  @Column({
    name: 'niv',
    unique: true
  })
  niv: string;

  @Column({
    name: 'color'
  })
  color: string;

  @Column({
    name: 'year'
  })
  year: number;

  @Column({
    name: 'lost_location'
  })
  lostlocation: string;

  @Column({
    name: 'date',
    type: 'date'
  })
  date: Date;

  // @Column({
  //   name: 'picture',
  //   nullable: true,
  //   type: 'simple-array'
  // })
  // picture: string[];

  @Column({
    name: 'description'
  })
  description: string;

  @Column({
    name: 'pub_status',
    default: 'public'
  })
  pub_status: status;

  @ManyToOne(type => User, user => user.id)
  user: number;

  @Column()
  userId: number

  @OneToMany(type => Comment, comment => comment.vehicle)
  comment: Comment[];

  @OneToMany(type => Report, report => report.vehicle)
  report: Report[];
}

