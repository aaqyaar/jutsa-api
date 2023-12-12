import { Module } from '@nestjs/common';
import { CompetitorService } from './competitor.service';
import { CompetitorController } from './competitor.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CompetitorController],
  providers: [CompetitorService, PrismaService],
})
export class CompetitorModule {}
