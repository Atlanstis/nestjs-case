import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createLogger, transports, format } from 'winston';
import { utilities, WinstonModule } from 'nest-winston';

async function bootstrap() {
  const loggerInts = createLogger({
    transports: [
      new transports.Console({
        format: format.combine(format.timestamp(), utilities.format.nestLike()),
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
