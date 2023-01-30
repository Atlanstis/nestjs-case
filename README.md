本文档用于记录 **NestJS** 的日志方案。

## [Pino](https://getpino.io/#/)

**Pino** 与 **NestJS** 的安装配置，可参考：[Pino with Nest](https://getpino.io/#/docs/web?id=pino-with-nest)。

具体步骤如下，

在 **AppModule** 类中，全局引入 **pino** 的 **LoggerModule**：

```typescript
import { LoggerModule } from 'nestjs-pino'

@Module({
  controllers: [AppController],
  imports: [LoggerModule.forRoot()]
})
class MyModule {}
```

在 **Controller** 类的构造器中，传入 **logger** ：

```typescript
import { Logger } from 'nestjs-pino'

@Controller()
export class AppController {
  constructor(private readonly logger: Logger) {}

  @Get()
  getHello() {
    this.logger.log('something')
    return `Hello world`
  }
}
```

### 精简打印日志

**Pino** 打印的日志较为详细，开发环境中，可以通过 [pino-pretty](https://github.com/pinojs/pino-pretty#readme) 精简。

配置如下：

```typescript
import { LoggerModule } from 'nestjs-pino'

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
      },
    }),
  ],
})
```

> [详细配置](https://github.com/pinojs/pino-pretty#readme)

### 日志保存为文件

通过 [pino-roll](https://github.com/feugy/pino-roll#readme) 可以将通过 **Pino** 生成的日志保存为文件，建议在生成环境中使用。

配置如下：

```typescript
import { LoggerModule } from 'nestjs-pino'

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
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
  ],
})
```

- size：单文件大小，文件超出此范围时，将生成新文件。通过单位 **k**，**m**，**g** 代表单位 **KB**，**MB** ，**GB**。
- frequency：生成的文件的频率，**daily**，**hourly**，代表按日或按小时。

