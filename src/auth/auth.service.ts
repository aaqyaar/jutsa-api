import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { verifyPassword, hashPassword } from 'src/utils/helpers';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/types/auth';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async generateToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async login(loginDto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: loginDto.id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await verifyPassword(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload: JwtPayload = {
      id: user.id,
      name: user.name,
      role: user.role,
    };

    const token = await this.generateToken(payload);

    return {
      token,
    };
  }

  async register(registerDto: RegisterDto) {
    // Check if user already exists
    if (
      await this.prismaService.user.findUnique({
        where: { id: registerDto.id },
      })
    ) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await hashPassword(registerDto.password);

    const user = await this.prismaService.user.create({
      data: {
        id: registerDto.id,
        name: registerDto.name,
        password: hashedPassword,
      },
    });

    const payload: JwtPayload = {
      id: user.id,
      name: user.name,
      role: user.role,
    };

    const token = await this.generateToken(payload);

    return {
      token,
    };
  }

  async me(req: Request) {
    const payload = req.user as JwtPayload;

    const user = await this.prismaService.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
