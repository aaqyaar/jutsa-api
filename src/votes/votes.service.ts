import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateVoteDto, CreateVoteDto } from './dto/create-vote.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VotesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createVoteDto: CreateVoteDto) {
    // check the role of the user who is voting
    const user = await this.prismaService.user.findUnique({
      where: {
        id: createVoteDto.userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== 'USER') {
      throw new BadRequestException('Only users can vote for competitors');
    }

    // check if the user has already voted
    const voteExists = await this.prismaService.vote.findFirst({
      where: {
        userId: createVoteDto.userId,
      },
    });

    if (voteExists) {
      throw new BadRequestException(
        'You have already voted for this competitor',
      );
    }

    const vote = await this.prismaService.vote.create({
      data: createVoteDto,
      include: { competitor: true, user: true },
    });

    const competitor = await this.prismaService.competitor.findUnique({
      where: {
        id: vote.competitorId,
      },
      include: { votes: true },
    });

    const votes = competitor.votes;

    const voteCount = votes.length;

    await this.prismaService.competitor.update({
      where: {
        id: vote.competitorId,
      },
      data: {
        voteCount,
      },
    });

    return {
      success: true,
      message: 'Your vote has been counted successfull',
    };
  }

  findAll() {
    return this.prismaService.vote.findMany({
      include: { competitor: true, user: true },
    });
  }

  findOne(id: string) {
    return this.prismaService.vote.findUnique({
      where: {
        id,
      },
      include: { competitor: true, user: true },
    });
  }

  update(id: string, updateVoteDto: UpdateVoteDto) {
    return this.prismaService.vote.update({
      where: {
        id,
      },
      data: updateVoteDto,
      include: { competitor: true, user: true },
    });
  }
}
