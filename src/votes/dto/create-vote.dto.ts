import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateVoteDto {
  @IsString()
  @IsNotEmpty()
  competitorId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
export class UpdateVoteDto extends PartialType(CreateVoteDto) {}
