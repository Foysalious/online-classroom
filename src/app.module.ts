import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot(dbConfig()),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, JwtService, UsersService],
})
export class AppModule {}
