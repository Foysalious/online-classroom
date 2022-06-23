import { BaseEntity, Column, Entity, Index, ObjectIdColumn } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  @Index()
  role: string;

  @Column()
  @Index()
  email: string;

  @Column()
  @Index()
  password: string;
}
