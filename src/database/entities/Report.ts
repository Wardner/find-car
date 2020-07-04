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

  @ManyToOne(type => Vehicle, vehicle => vehicle.report)
  vehicle: Vehicle;

  @ManyToOne(type => User, user => user.report)
  user: User;
}