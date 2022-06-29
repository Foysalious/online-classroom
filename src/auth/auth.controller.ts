import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
  Req,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';
import { RegisterDto } from './dto/register.dto';

@Controller('api/v1')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('auth/register')
  async register(@Body() registerDto: RegisterDto, @Res() response: Response) {
    const user = await this.authService.register(registerDto);
    return response.status(201).send(user);
  }

  @Post('auth/profile')
  async getProfile(@Res() response: Response) {
    const userInfo = response.locals.userPayload
    const user = await this.authService.getProfile(userInfo);
    return response.status(201).send(user);
  }

  @Post('auth/login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() authCredentialDto: LoginDto) {
    return await this.authService.login(authCredentialDto);
  }

}
