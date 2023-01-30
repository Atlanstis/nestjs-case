import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './log/log.entity';
import { Profile } from './profile/profile.entity';
import { Role } from './role/role.entity';
import { User } from './user/user.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LoggerModule } from 'nestjs-pino';
import { join } from 'path';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'nestjs',
      entities: [User, Profile, Log, Role],
      synchronize: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE_ENV === 'development'
            ? {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                },
              }
            : {
                target: 'pino-roll',
                options: {
                  file: join('logs', 'log'),
                  frequency: 'daily',
                  size: '10m',
                  mkdir: true,
                },
              },
      },
    }),
    UserModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
