import { EntityRepository, Repository } from 'typeorm';
import { Classroom } from './entities/classroom.entity';

@EntityRepository(Classroom)
export class ClassRoomRepository extends Repository<Classroom> {}
