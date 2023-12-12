import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  UpdateCompetitorDto,
  CreateCompetitorDto,
} from './dto/create-competitor.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { formatPrismaError } from 'src/utils/helpers';

@Injectable()
export class CompetitorService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCompetitorDto: CreateCompetitorDto) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: createCompetitorDto.userId,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const competitor = await this.prismaService.competitor.create({
        data: createCompetitorDto,
        include: { votes: true, user: true },
      });

      // Update user role to competitor
      await this.prismaService.user.update({
        where: {
          id: user.id,
        },
        data: {
          role: 'COMPETITOR',
        },
      });

      return competitor;
    } catch (error) {
      const err = error as Error;
      const message = formatPrismaError(err.message);
      throw new InternalServerErrorException(message);
    }
  }

  async recognizeWinner() {
    try {
      const competitors = await this.prismaService.competitor.findMany({
        include: { votes: true, user: true },
      });

      const competitorsWithVotes = competitors.map((competitor) => {
        const votes = competitor.votes;
        const voteCount = votes.length;

        return {
          ...competitor,
          voteCount,
        };
      });

      const sortedCompetitors = competitorsWithVotes.sort(
        (a, b) => b.voteCount - a.voteCount,
      );

      const winner = sortedCompetitors[0];

      // other competitors will be set to false as they are not winners
      const otherCompetitors = sortedCompetitors.slice(1);

      for (const competitor of otherCompetitors) {
        await this.prismaService.competitor.update({
          where: {
            id: competitor.id,
          },
          data: {
            isWinner: false,
          },
        });
      }

      const competitorWinner = await this.prismaService.competitor.update({
        where: {
          id: winner.id,
        },
        data: {
          isWinner: true,
        },
      });

      return competitorWinner;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    try {
      return this.prismaService.competitor.findMany({
        include: { votes: true, user: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findOne(id: string) {
    try {
      return this.prismaService.competitor.findUnique({
        where: {
          id,
        },
        include: { votes: true, user: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  update(id: string, updateCompetitorDto: UpdateCompetitorDto) {
    try {
      return this.prismaService.competitor.update({
        where: {
          id,
        },
        data: updateCompetitorDto,
        include: { votes: true, user: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  remove(id: string) {
    try {
      return this.prismaService.competitor.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
