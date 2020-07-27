import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../baseEntities/BaseEntity';
import { Model } from './Model';

@Entity({ name: 'brand' })
export class Brand extends BaseEntity {
  @Column({
    name: 'name'
  })
  name: string;

  @OneToMany(type => Model, model => model.brand)
  model: Model[];
}