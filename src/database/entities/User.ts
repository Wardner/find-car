import { Entity, Column, BeforeInsert, OneToMany } from 'typeorm';
import { BaseEntity } from '../baseEntities/BaseEntity';
import { Vehicle } from './Vehicle';
import { Comment } from './Comment';

import bcrypt from 'bcryptjs'
import { Report } from './Report';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({
    name: 'name'
  })
  name: string

  @Column({
    name: 'lastname'
  })
  lastname: string;

  @Column({
    name: 'email',
    unique: true
  })
  email: string;

  @Column({nullable: false})
  password: string;

  @Column({
    name: 'dni',
    primary: true
  })
  dni: string;

  @Column({
    name: 'age'
  })
  age: number;

  @Column({
    name: 'cel'
  })
  cel: string;

  // @Column({
  //   name: 'location'
  // })
  // location: {
  //   lat: string,
  //   lon: string
  // };

  @Column({
    name: 'status'
  })
  status: boolean;

  @OneToMany(type => Vehicle, vehicle => vehicle.user)
  vehicle: Vehicle[];

  @OneToMany(type => Comment, comment => comment.user)
  comment: Comment[];

  @OneToMany(type => Report, report => report.user)
  report: Report[];

  @BeforeInsert()
  async encryptPassword() {
    const hash = bcrypt.hashSync(this.password, 10);
    this.password = hash;
    return this.password;
  }

  comparePassword = async (password: string): Promise<boolean> =>
    bcrypt.compareSync(password, this.password);

}


