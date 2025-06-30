import { ApiPropertyOptional } from '@nestjs/swagger';
import { VisualState } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateBuildingDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  number?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  streetId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  decisionId?: string;

  @ApiPropertyOptional({ enum: VisualState })
  @IsEnum(VisualState)
  @IsOptional()
  visualState?: VisualState;
}
