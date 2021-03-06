import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { v4 as uuidv4 } from 'uuid';
import { ClassRoomRepository } from './classroom.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamRepository } from './exam.repository';
import { CreateExamDto } from './dto/create-exam.dto';
import * as mongodb from "mongodb";
import { StudentSignUpDto } from './dto/student-sign-up.dto';
import { UserRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcryptjs';
import { SubscriptionRepository } from './subscribtion.repository';
import { UploadPostDto } from './dto/upload-post.dto';
import 'multer';
import { AwsS3 } from './aws-s3';
import { SubmissionRepository } from './submission.repository';
import { MarkDto } from './dto/mark.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SendMail } from '../users/mail/send.mail';
@Injectable()
export class ClassroomService {

  constructor(
    @InjectRepository(ClassRoomRepository) private classRoomRepository: ClassRoomRepository,
    @InjectRepository(ExamRepository) private postRepository: ExamRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(SubscriptionRepository) private subscriptionRepository: SubscriptionRepository,
    @InjectRepository(SubmissionRepository) private submissionRepository: SubmissionRepository,
    private awsS3: AwsS3,
    private sendUserMail: SendMail
  ) { }

  create(createClassroomDto: CreateClassroomDto, userInfo: User) {
    const generateCode = uuidv4()
    return this.classRoomRepository.save({ code: generateCode, teacher_id: userInfo._id, classroom_name: createClassroomDto.classroom_name })
  }

  createPost(createExamDto: CreateExamDto, userInfo: User) {
    this.postRepository.save({
      type: createExamDto.type, classroom_id: createExamDto.classroom_id, name: createExamDto.name,
      question: createExamDto.question, teacher_id: userInfo._id, mark: Number(createExamDto.mark), deadLine: new Date(createExamDto.deadLine)
    })
  }

  async getPost(userInfo: User) {
    const post = await this.postRepository.find({
      where: {
        teacher_id: userInfo._id
      }
    })
    if (post.length == 0) {
      throw new NotFoundException("No Posts Found")
    }
    return post
  }

  async signUpToClass(studentSignUpDto: StudentSignUpDto) {
    const classroom = await this.classRoomRepository.findOne({
      where: {
        code: studentSignUpDto.code
      }
    })
    if (classroom == undefined) throw new NotFoundException("No classroom found with that code")
    const student = await this.userRepository.findOne({
      where: {
        role: 'student',
        email: studentSignUpDto.email
      }
    });
    if (student)
      throw new UnauthorizedException('Student Already Created')

    const salt = await bcrypt.genSaltSync(10);
    const password = await bcrypt.hashSync(studentSignUpDto.password, salt)
    const user = await this.userRepository.save({
      role: 'student',
      email: studentSignUpDto.email,
      name: studentSignUpDto.email,
      school_id: studentSignUpDto.school_id,
      password: password
    });

    this.subscriptionRepository.save({
      classroom_id: classroom._id,
      student_id: user._id,
      teacher_id: classroom.teacher_id
    })
  }
  async uploadPost(studentSignUpDto: UploadPostDto, file: any, userInfo: User) {
    const post = await this.postRepository.findOne({
      where: {
        _id: new mongodb.ObjectId(studentSignUpDto.post_id)
      }
    })
    if (post == undefined) throw new NotFoundException("No Post Found")
    const classroom = await this.classRoomRepository.findOne({
      where: {
        _id: new mongodb.ObjectId(post.classroom_id)
      }
    })

    const base64Image: string = file.buffer.toString('base64');
    const imageLink = (await this.awsS3.uploadImage(base64Image)).Location
    this.submissionRepository.save({
      file: imageLink,
      student_id: userInfo._id,
      post_id: String(post._id),
      teacher_id: classroom.teacher_id
    })
  }

  async provideMarkingForPost(markDto: MarkDto, userInfo: User, id: string) {
    const submission = await this.submissionRepository.findOne({
      where: {
        _id: new mongodb.ObjectId(id),
        student_id: markDto.student_id,
        teacher_id: userInfo._id,
        post_id: markDto.post_id
      }
    })
    if (submission == undefined) throw new NotFoundException("Submission Not Found")
    submission.marks = Number(markDto.mark)
    await this.submissionRepository.save(submission)

  }

  async getClassRoom(userInfo: User) {
    const classroom = await this.classRoomRepository.find({
      where: {
        teacher_id: userInfo._id
      }
    })
    if (classroom.length == 0) {
      throw new NotFoundException("No Classroom Found")
    }
    return classroom
  }

  async getClassrommSubscriptions(id: string, userInfo: User) {
    const classroom = await this.subscriptionRepository.find({
      where: {
        classroom_id: id
      }
    })
    if (classroom.length == 0) {
      throw new NotFoundException("No Subscription Found")
    }
    return classroom
  }

  async sendMail(students: User[]) {
    for (let i = 0; i < students.length; i++) {
      this.sendUserMail.sentStudentMail(students[i].email)
    }
  }

  @Cron(CronExpression.EVERY_SECOND)
  async sendNotification() {
    const time = new Date
    time.setHours(time.getHours() - 1);
    const posts = await this.postRepository.find()
    const classRoomIds = []
    for (let i = 0; i < posts.length; i++) {
      const date = new Date(posts[i].deadLine)
      date.setHours(date.getHours() - 1);
      if (date == time) {
        classRoomIds.push(new mongodb.ObjectId(posts[i].classroom_id))
      }
    }
    let uniqueClassroomIds = [...new Set(classRoomIds)];
    const subscribtions = await this.subscriptionRepository.find({
      where: {
        $or: [{ classroom_id: { $in: uniqueClassroomIds } }]
      }
    })
    const studentId = []
    for (let i = 0; i < subscribtions.length; i++) {
      studentId.push(subscribtions[i].student_id)
    }

    const students = await this.userRepository.find({
      where: {
        $or: [{ _id: { $in: studentId } }]
      }
    })
    this.sendMail(students)
  }
}
