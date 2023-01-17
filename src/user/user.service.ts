import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async add(user: User): Promise<User> {
    const userTemp = await this.usersRepository.create(user);
    return this.usersRepository.save(userTemp);
  }

  update(id: number, user: Partial<User>) {
    return this.usersRepository.update(id, user);
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
