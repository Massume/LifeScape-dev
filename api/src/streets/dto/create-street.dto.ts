import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateStreetDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  districtId: string;
}
