import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard';
import { DistrictsService } from './districts.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';

@ApiTags('districts')
@ApiBearerAuth()
@Controller('districts')
@UseGuards(JwtAuthGuard)
export class DistrictsController {
  constructor(private readonly districtsService: DistrictsService) {}

  @Post()
  create(@Req() req: Request & { user: any }, @Body() dto: CreateDistrictDto) {
    return this.districtsService.create((req.user as any).userId, dto);
  }

  @Get()
  findAll(@Req() req: Request & { user: any }) {
    return this.districtsService.findAll((req.user as any).userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.districtsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDistrictDto) {
    return this.districtsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.districtsService.remove(id);
  }
}
