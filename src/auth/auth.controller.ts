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
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {  LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';

@Controller('api/v1')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/register')
  async register(@Req() request: Request, @Res() response: Response) {
    const user = await this.authService.register(request.body);
    return response.status(201).send(user);
  }

  @Post('auth/profile')
  async getProfile( @Res() response: Response) {
    const userInfo = response.locals.userPayload
    const user = await this.authService.getProfile(userInfo);
    return response.status(201).send(user);
  }

  @Post('auth/login')
  async login(@Body() authCredentialDto: LoginDto) {
    return await this.authService.login( authCredentialDto);
  }

}
