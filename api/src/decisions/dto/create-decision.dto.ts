import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateDecisionDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsBoolean()
  isPositive: boolean;

  @ApiProperty()
  @IsString()
  districtId: string;

  @ApiProperty()
  @IsString()
  streetId: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  buildingId?: string;
}
