import { HttpModule, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { JwtModule } from '@nestjs/jwt';
import { SendMail } from './mail/send.mail';

@Module({
  controllers: [UsersController],
  providers: [UsersService,SendMail],
  imports: [TypeOrmModule.forFeature([UserRepository])],
})
export class UsersModule {}
