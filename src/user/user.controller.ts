import { Controller, Get } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('find')
  findOne(): Promise<User> {
    return this.userService.findOne(1);
  }

  @Get('add')
  add() {
    const user = {
      username: 'wxc',
      password: '123456',
    } as User;
    return this.userService.add(user);
  }

  @Get('update')
  update() {
    const user = { password: '654321' } as User;
    return this.userService.update(1, user);
  }

  @Get('delete')
  delete() {
    return this.userService.delete(1);
  }
}
