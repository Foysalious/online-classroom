import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { Express, Response, Request } from 'express';
import { CreateExamDto } from './dto/create-exam.dto';
import { StudentSignUpDto } from './dto/student-sign-up.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadPostDto } from './dto/upload-post.dto';
import { log } from 'console';
import { MarkDto } from './dto/mark.dto';
import { User } from '../users/entities/user.entity';

@Controller('api/v1')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) { }

  @Post('classroom')
  async create(@Body() createClassroomDto: CreateClassroomDto, @Res() response: Response) {
    const userInfo = response.locals.userPayload
    const classroom = await this.classroomService.create(createClassroomDto, userInfo);
    response.send(classroom)
  }

  @Post('posts')
  async createPost(@Body() createExamDto: CreateExamDto, @Res() response: Response) {
    const userInfo = response.locals.userPayload
    this.classroomService.createPost(createExamDto, userInfo);
    response.send({ message: "Posts Created" })
  }

  @Get('posts')
  async getPost(@Res() response: Response) {
    const userInfo = response.locals.userPayload
    const post = await this.classroomService.getPost(userInfo);
    response.send(post)
  }

  @Post('class-sign-up')
  async signUpToClass(@Body() studentSignUpDto: StudentSignUpDto, @Res() response: Response) {
    await this.classroomService.signUpToClass(studentSignUpDto);
    response.send({ message: "successful" })
  }

  @Post('upload-post')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPost(@UploadedFile() file: unknown, @Query() studentSignUpDto: UploadPostDto, @Res() response: Response) {
    const userInfo = response.locals.userPayload
    this.classroomService.uploadPost(studentSignUpDto, file, userInfo);
    response.send({ message: "successful" })
  }

  @Post('submission-mark/:id')
  async provideMarkingForPost(@Param('id') id: string, @Body() markDto: MarkDto, @Res() response: Response) {
    const userInfo: User = response.locals.userPayload
    this.classroomService.provideMarkingForPost(markDto, userInfo, id);
    response.status(201).send()
  }
}
