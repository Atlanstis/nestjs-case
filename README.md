本文档用于记录 **NestJS** 的日志方案。

### [winston](https://github.com/winstonjs/winston)

可以通过 [nest-winston](https://github.com/gremo/nest-winston#readme) 快速将 **winston** 与 **NestJS** 集成。

#### 安装

```shell
$ pnpm i nest-winston winston
```

#### 配置

在 **main.ts** 中，创建 **winston** 的日志实例，并通过 **NestJS** 提供的自定义日志方法，进行注册。

```typescript
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
```

其中 **winston** 的日志实例的具体配置可参考[配置](https://github.com/winstonjs/winston#quick-start)。

之后在 **app.module.ts** 中 `providers` 中传入。

```typescript
import { Global, Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Global()
@Module({
  imports: [],
  providers: [AppService, Logger],
  exports: [Logger],
  controllers: [AppController],
})
export class AppModule {}
```

> 其中 `@Global()` 与`exports: [Logger]` 的使用，可以使其它 **Controller** 类构造器中传入对应日志实例。

最后，在需使用的**Controller** 类传入。

```typescript
import { Controller, Logger } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {
    this.logger.log('UserController init');
  }
}
```

