import { Injectable } from '@nestjs/common';
import { User } from './entities/User';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmailOrThrow(email: string): Promise<User> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { email },
    });
    return new User(user);
  }
}
