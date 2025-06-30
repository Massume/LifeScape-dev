import { ApiProperty } from '@nestjs/swagger';
import { VisualState } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class CreateBuildingDto {
  @ApiProperty()
  @IsString()
  number: string;

  @ApiProperty()
  @IsString()
  streetId: string;

  @ApiProperty()
  @IsString()
  decisionId: string;

  @ApiProperty({ enum: VisualState })
  @IsEnum(VisualState)
  visualState: VisualState;
}
