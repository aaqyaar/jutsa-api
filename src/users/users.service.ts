import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    try {
      return await this.prismaService.user.findMany({
        include: {
          competitor: true,
        },
      });
    } catch (error) {
      const err = error as Error;
      throw new InternalServerErrorException(err.message);
    }
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
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
