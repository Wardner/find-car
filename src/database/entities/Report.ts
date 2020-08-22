import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../baseEntities/BaseEntity';
import { User } from './User';
import { Vehicle } from './Vehicle';

@Entity({ name: 'report' })
export class Report extends BaseEntity {
  @Column({
    name: 'report_body'
  })
  report_body: string;

  @Column()
  owner: string;

  @ManyToOne(type => Vehicle, vehicle => vehicle.id, {cascade: true, onDelete: 'CASCADE'})
  vehicle: number;

  @ManyToOne(type => User, user => user.id, {cascade: true, onDelete: 'CASCADE'})
  user: number;
}