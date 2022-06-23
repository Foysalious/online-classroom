import { BaseEntity, Column, Entity, Index, ObjectIdColumn } from 'typeorm';

@Entity('classroom')
export class Classroom extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  @Index()
  code: string;

  @Column()
  @Index()
  teacher_id: string;

  @Column()
  @Index()
  classroom_name: string;
}
