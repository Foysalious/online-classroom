import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SendMail } from './mail/send.mail';
import { Users } from './user.type';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private sendMail: SendMail,
  ) { }

  async createTeacher(request){
    this.sendMail.sentMail(request.password,request.email)
  }

  async createUserByEmail(request) {
    if (request.role == Users.TEACHER) {
       this.createTeacher(request)
    }
    const salt = await bcrypt.genSaltSync(10);
    if (request.password)
      request.password = request.password
        ? await bcrypt.hashSync(request.password, salt)
        : null;
    return await this.userRepository.save({
      role: request.role,
      email: request.email,
      password:request.password
    });
  }
  
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
