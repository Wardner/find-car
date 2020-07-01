import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../baseEntities/BaseEntity';
import { User } from './user';
import { Comment } from './Comment';
import { Report } from './Report';

enum status {
  blocked = 'blocked',
  public = 'public',
  recovered = 'recovered'
}

@Entity({ name: 'vehicle' })
export class Vehicle extends BaseEntity {
  @Column({
    name: 'brand'
  })
  brand: string;

  @Column({
    name: 'model'
  })
  model: string;

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
  lostlocation: {
    lat: string,
    lon: string
  };

  @Column({
    name: 'picture'
  })
  picture: string;

  @Column({
    name: 'description'
  })
  description: string;

  @Column({
    name: 'pub_status',
    default: 'public'
  })
  pub_status: status;

  @ManyToOne(type => User, user => user.vehicle)
  user: User;

  @OneToMany(type => Comment, comment => comment.vehicle)
  comment: Comment[];

  @OneToMany(type => Report, report => report.vehicle)
  report: Report[];
}

