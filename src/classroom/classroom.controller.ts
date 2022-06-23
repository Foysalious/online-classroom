import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { Response, Request } from 'express';
@Controller('api/v1')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) { }

  @Post('classroom')
  async create(@Body() createClassroomDto: CreateClassroomDto, @Res() response: Response) {
    const userInfo = response.locals.userPayload
    this.classroomService.create(createClassroomDto, userInfo);
    response.send({ message: "Classroom Created" })
  }


}
