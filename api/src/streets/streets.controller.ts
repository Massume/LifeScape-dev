import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard';
import { StreetsService } from './streets.service';
import { CreateStreetDto } from './dto/create-street.dto';
import { UpdateStreetDto } from './dto/update-street.dto';

@ApiTags('streets')
@ApiBearerAuth()
@Controller('streets')
@UseGuards(JwtAuthGuard)
export class StreetsController {
  constructor(private readonly streetsService: StreetsService) {}

  @Post()
  create(@Body() dto: CreateStreetDto) {
    return this.streetsService.create(dto);
  }

  @Get()
  findAll() {
    return this.streetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.streetsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateStreetDto) {
    return this.streetsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.streetsService.remove(id);
  }
}
