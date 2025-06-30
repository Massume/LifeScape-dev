import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDistrictDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;
}
