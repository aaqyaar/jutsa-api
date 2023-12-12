import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { users } from './users';
import { hashPassword } from 'src/utils/helpers';

@Injectable()
export class SeedService {
  constructor(private readonly prismaService: PrismaService) {}

  async seed() {
    if ((await this.prismaService.user.count()) > 0) {
      return;
    }

    for (const user of users) {
      console.log('Seeding user: ', user);
      const hashedPassword = await hashPassword(user.password);
      await this.prismaService.user.create({
        data: {
          id: user.id,
          name: user.name,
          password: hashedPassword,
          role: 'USER',
        },
      });
    }
  }
}
