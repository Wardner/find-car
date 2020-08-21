import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../baseEntities/BaseEntity';

@Entity({ name: 'stadistics' })
export class Stadistic extends BaseEntity {
  @Column({
    name: 'sectorid',
    nullable: true
  })
  sectorid: number;

  @Column({nullable: true})
  sector: string;

  @Column({nullable: true})
  brandid: number;

  @Column({nullable: true})
  brand: string;
}