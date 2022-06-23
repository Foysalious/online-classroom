import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UsersModule } from './users/users.module';
import dbConfig from './config/database.config';
import { UsersService } from './users/users.service';
import { UserRepository } from './users/users.repository';
import { SendMail } from './users/mail/send.mail';
import { AuthorizationMiddleware } from './middlewares/authorization.middleware';
import { ClassroomModule } from './classroom/classroom.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot(dbConfig()),
    TypeOrmModule.forFeature([UserRepository]),
    ClassroomModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, JwtService, UsersService, SendMail],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .forRoutes('*');
  }
}
