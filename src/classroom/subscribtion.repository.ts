import { EntityRepository, Repository } from 'typeorm';
import { Exam } from './entities/exam.entity';
import { Subscription } from './entities/subscription.entity';

@EntityRepository(Subscription)
export class SubscriptionRepository extends Repository<Subscription> { }
