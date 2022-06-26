import { Module } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { ClassroomController } from './classroom.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassRoomRepository } from './classroom.repository';
import { ExamRepository } from './exam.repository';
import { AuthService } from 'src/auth/auth.service';
import { UserRepository } from 'src/users/users.repository';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SendMail } from 'src/users/mail/send.mail';
import { SubscriptionRepository } from './subscribtion.repository';
import { AwsS3 } from './aws-s3';
import { SubmissionRepository } from './submission.repository';

@Module({
  controllers: [ClassroomController],
  providers: [ClassroomService, AuthService, JwtService, UsersService, SendMail, AwsS3],
  imports: [TypeOrmModule.forFeature([ClassRoomRepository, ExamRepository, UserRepository, SubscriptionRepository, SubmissionRepository])],
})
export class ClassroomModule { }
