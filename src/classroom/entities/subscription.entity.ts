import { BaseEntity, Column, Entity, Index, ObjectIdColumn } from 'typeorm';

@Entity('subscriptions')
export class Subscription extends BaseEntity {
    @ObjectIdColumn()
    _id: string;

    @Column()
    @Index()
    classroom_id: string;

    @Column()
    @Index()
    student_id: string;

}
