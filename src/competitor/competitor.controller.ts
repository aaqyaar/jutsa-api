import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompetitorService } from './competitor.service';
import {
  UpdateCompetitorDto,
  CreateCompetitorDto,
} from './dto/create-competitor.dto';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from '@prisma/client';

@Controller('competitor')
export class CompetitorController {
  constructor(private readonly competitorService: CompetitorService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createCompetitorDto: CreateCompetitorDto) {
    return this.competitorService.create(createCompetitorDto);
  }

  @Get('get-winner')
  recognizeWinner() {
    return this.competitorService.recognizeWinner();
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.competitorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.competitorService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompetitorDto: UpdateCompetitorDto,
  ) {
    return this.competitorService.update(id, updateCompetitorDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.competitorService.remove(id);
  }
}
