import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { VotesService } from './votes.service';
import { UpdateVoteDto, CreateVoteDto } from './dto/create-vote.dto';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from '@prisma/client';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  async create(@Body() createVoteDto: CreateVoteDto) {
    return await this.votesService.create(createVoteDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.votesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.votesService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateVoteDto: UpdateVoteDto) {
    return this.votesService.update(id, updateVoteDto);
  }
}
