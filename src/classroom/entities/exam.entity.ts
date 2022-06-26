import { BaseEntity, Column, Entity, Index, ObjectIdColumn } from 'typeorm';

@Entity('posts')
export class Exam extends BaseEntity {
    @ObjectIdColumn()
    _id: string;

    @Column()
    @Index()
    type: string;

    @Column()
    @Index()
    classroom_id: string;

    @Column()
    name: string;

    @Column()
    question: string;

    @Column()
    @Index()
    teacher_id: string;

    @Column()
    @Index()
    mark: Number;

    @Column()
    @Index()
    deadLine: Date;
}
