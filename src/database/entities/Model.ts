import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../baseEntities/BaseEntity';
import { Brand } from './Brand';
import { Vehicle } from './Vehicle';


@Entity({ name: 'model' })
export class Model extends BaseEntity {
  @Column({
    name: 'name'
  })
  name: string;

  @ManyToOne(type => Brand, brand => brand.id)
  brand: number;

  @OneToMany(type => Vehicle, vehicle => vehicle.model)
  vehicle: Vehicle[];
}