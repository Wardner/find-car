import { Entity, Column, BeforeInsert, OneToMany } from 'typeorm';
import { BaseEntity } from '../baseEntities/BaseEntity';
import { Vehicle } from './Vehicle';
import { Comment } from './Comment';

import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import { Report } from './Report';

enum rol {
  user = 'user',
  admin = 'admin'
}

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
    name: 'username'
  })
  username: string;

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
  cedula: string;

  @Column({
    name: 'cel'
  })
  cel: string;

  @Column({
    name: 'role',
    default: 'user'
  })
  role: rol;

  @Column({
    name: 'token',
    nullable: true
  })
  token: string;

  @Column({
    name: 'status',
    default: false
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

  @BeforeInsert()
  async puToken() {
    const hash = crypto.randomBytes(25).toString('hex');
    this.token = hash;
    return this.token;
  }

}


