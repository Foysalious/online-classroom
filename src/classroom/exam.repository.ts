import { EntityRepository, Repository } from 'typeorm';
import { Exam } from './entities/exam.entity';

@EntityRepository(Exam)
export class ExamRepository extends Repository<Exam> { }
