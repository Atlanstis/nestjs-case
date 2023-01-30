本文档用于记录 **NestJS** 的日志方案。

### 官方日志模块

在 `main.ts` 中，创建实例时，可以通过配置 `logger` 的参数，控制 **NestJS** 的日志打印，日志打印在控制台中，可用于开发中的调试。

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  await app.listen(3000);
}
bootstrap();
```

`logger` 可为以下内容，默认为 `true`，开启打印：

- false：关闭日志打印；
- ['log', 'error', 'warn', 'debug', 'verbose']：打印不同等级的日志。

#### Logger 类

官方提供的 **@nestjs/common** 包中，提供了一个 **Logger** 类，可以通过这个类在控制台进行相关日志的打印。

**Logger** 类实例化时，可以传递一个参数作为模块名称，打印时，就会体现相应的信息。

```typescript
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  const port = 3000;
  logger.log(`The application is running on port: ${port}`);
  await app.listen(port);
}
bootstrap();
```

如需在 **Controller** 文件中使用 **Logger** 类，在相对应的 **Controller** 类中，声明一个 **logger** 实例即可，之后即可通过该实例进行日志的打印。

```typescript
import { Controller, Get, Logger } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  private logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {
    this.logger.log('UserController init');
  }

  @Get()
  findAll(): Promise<User[]> {
    this.logger.log('请求 Users');
    return this.userService.findAll();
  }
}
```

> [Logger](https://docs.nestjs.com/techniques/logger)

