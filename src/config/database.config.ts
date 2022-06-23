import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'typeOrmConfig',
  (): TypeOrmModuleOptions => ({
    type: 'mongodb',
    url: 'mongodb://localhost:27017/online_classroom',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
  }),
);
