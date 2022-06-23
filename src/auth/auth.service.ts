import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async register(request: any) {
    const user = await this.userService.createUserByEmail(request);
    return await this.getAccessToken(user._id, user.role, user.email);
  }
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
  async getAccessToken(
    id: string,
    role: string,
    email: string,
  ): Promise<{ token: string }> {
    const payload: JwtPayload = { id, role, email };
    const secret = { secret: process.env.APP_SECRET ?? 'topsecret51' };
    const token = this.jwtService.sign(payload, secret);
    return { token };
  }
}
