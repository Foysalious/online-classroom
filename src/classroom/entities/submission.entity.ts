import { BaseEntity, Column, Entity, Index, ObjectIdColumn } from 'typeorm';

@Entity('submission')
export class Submission extends BaseEntity {
    @ObjectIdColumn()
    _id: string;

    @Column()
    @Index()
    file: string;

    @Column()
    @Index()
    student_id: string;

    @Column()
    post_id: string;

    @Column()
    teacher_id: string;

    @Column()
    marks: Number;
} 
