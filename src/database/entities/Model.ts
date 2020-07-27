import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../baseEntities/BaseEntity';
import { Brand } from './Brand';


@Entity({ name: 'model' })
export class Model extends BaseEntity {
  @Column({
    name: 'name',
    type: 'string'
  })
  name: string;

  @ManyToOne(type => Brand, brand => brand.id)
  brand: number;
}