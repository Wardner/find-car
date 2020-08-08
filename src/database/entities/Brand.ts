import { Entity, Column, OneToMany, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../baseEntities/BaseEntity';
import { Model } from './Model';
import { Vehicle } from './Vehicle';

@Entity({ name: 'brand' })
export class Brand extends BaseEntity {
  @Column({
    name: 'name'
  })
  name: string;

  @OneToMany(type => Model, model => model.brand)
  model: Model[];

  @OneToMany(type => Vehicle, vehicle => vehicle.brand)
  vehicle: Vehicle[];
}