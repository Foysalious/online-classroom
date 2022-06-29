import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseInterceptors, UploadedFile, Query, ValidationPipe, UsePipes, UnauthorizedException } from '@nestjs/common';
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
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createClassroomDto: CreateClassroomDto, @Res() response: Response) {
    const userInfo = response.locals.userPayload
    if (userInfo.role == "Student")
      throw new UnauthorizedException("You are not authorized")
    const classroom = await this.classroomService.create(createClassroomDto, userInfo);
    response.send(classroom)
  }

  @Post('posts')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createPost(@Body() createExamDto: CreateExamDto, @Res() response: Response) {
    const userInfo = response.locals.userPayload
    if (userInfo.role == "Admin" || userInfo.role == "Student")
      throw new UnauthorizedException("You are not authorized")
    this.classroomService.createPost(createExamDto, userInfo);
    response.send({ message: "Posts Created" })
  }

  @Get('posts')
  async getPost(@Res() response: Response) {
    const userInfo = response.locals.userPayload
    if (userInfo.role == "Admin" || userInfo.role == "Student")
      throw new UnauthorizedException("You are not authorized")
    const post = await this.classroomService.getPost(userInfo);
    response.send(post)
  }

  @Post('class-sign-up')
  @UsePipes(new ValidationPipe({ transform: true }))
  async signUpToClass(@Body() studentSignUpDto: StudentSignUpDto, @Res() response: Response) {
    await this.classroomService.signUpToClass(studentSignUpDto);
    response.send({ message: "successful" })
  }

  @Post('upload-post-submission')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe({ transform: true }))
  async uploadPost(@UploadedFile() file: unknown, @Query() studentSignUpDto: UploadPostDto, @Res() response: Response) {
    const userInfo = response.locals.userPayload
    if (userInfo.role == "Admin" || userInfo.role == "Teacher")
      throw new UnauthorizedException("You are not authorized")
    this.classroomService.uploadPost(studentSignUpDto, file, userInfo);
    response.send({ message: "successful" })
  }

  @Post('submission-mark/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async provideMarkingForPost(@Param('id') id: string, @Body() markDto: MarkDto, @Res() response: Response) {
    const userInfo: User = response.locals.userPayload
    if (userInfo.role == "Admin" || userInfo.role == "Student")
      throw new UnauthorizedException("You are not authorized")
    this.classroomService.provideMarkingForPost(markDto, userInfo, id);
    response.status(201).send()
  }

  @Get('classrooms')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getClassRoom(@Res() response: Response) {
    const userInfo = response.locals.userPayload
    if (userInfo.role == "Admin" || userInfo.role == "Student")
      throw new UnauthorizedException("You are not authorized")
    const classroom = await this.classroomService.getClassRoom(userInfo);
    response.send(classroom)
  }

  @Get('classroom-subscriptions/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getClassrommSubscriptions(@Param('id') id: string, @Res() response: Response) {
    const userInfo = response.locals.userPayload
    if (userInfo.role == "Admin" || userInfo.role == "Student")
      throw new UnauthorizedException("You are not authorized")
    const subscribtionList = await this.classroomService.getClassrommSubscriptions(id, userInfo);
    response.send(subscribtionList)
  }

}
