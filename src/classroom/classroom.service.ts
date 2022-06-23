import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { v4 as uuidv4 } from 'uuid';
import { ClassRoomRepository } from './classroom.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClassroomService {

  constructor(
    @InjectRepository(ClassRoomRepository)
    private classRoomRepository: ClassRoomRepository,

  ) { }
  create(createClassroomDto: CreateClassroomDto, userInfo: User) {
    const generateCode = uuidv4()
    this.classRoomRepository.save({ code: generateCode, teacher_id: userInfo._id, classroom_name: createClassroomDto.classroom_name })
  }

}
