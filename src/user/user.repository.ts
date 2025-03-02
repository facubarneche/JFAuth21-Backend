import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

//   async createUser(name: string, email: string): Promise<User> {
//     return this.prisma.user.create({
//       data: { username, password, salt,  },
//     });
//   }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async getAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
