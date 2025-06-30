import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateDecisionDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isPositive?: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  districtId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  streetId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  buildingId?: string;
}
