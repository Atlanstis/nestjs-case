import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createLogger, transports, format } from 'winston';
import { utilities, WinstonModule } from 'nest-winston';
import 'winston-daily-rotate-file';

async function bootstrap() {
  const loggerInts = createLogger({
    transports: [
      new transports.Console({
        level: 'info',
        format: format.combine(format.timestamp(), utilities.format.nestLike()),
      }),
      new transports.DailyRotateFile({
        level: 'info',
        dirname: 'logs',
        filename: 'info-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        utc: true,
        format: format.combine(format.timestamp(), format.simple()),
      }),
      new transports.DailyRotateFile({
        level: 'warn',
        dirname: 'logs',
        filename: 'warn-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        utc: true,
        format: format.combine(format.timestamp(), format.simple()),
      }),
    ],
  });
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: loggerInts,
    }),
  });
  const port = 3000;
  await app.listen(port);
}
bootstrap();
