import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './log/log.entity';
import { Profile } from './profile/profile.entity';
import { Role } from './role/role.entity';
import { User } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'gypsophila',
      entities: [User, Profile, Log, Role],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
