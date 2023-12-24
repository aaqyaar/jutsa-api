import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { excludeFields, excludeFieldsFromArr } from 'src/utils/helpers';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    try {
      const users = await this.prismaService.user.findMany({
        include: {
          competitor: true,
        },
      });
      return excludeFieldsFromArr(users, ['password']);
    } catch (error) {
      const err = error as Error;
      throw new InternalServerErrorException(err.message);
    }
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
      include: { competitor: true },
    });

    return excludeFields(user, ['password']);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        id: updateUserDto.id,
        name: updateUserDto.name,
        password: updateUserDto.password,
      },
    });
  }
}
