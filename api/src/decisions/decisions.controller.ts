import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard';
import { DecisionsService } from './decisions.service';
import { CreateDecisionDto } from './dto/create-decision.dto';
import { UpdateDecisionDto } from './dto/update-decision.dto';

@ApiTags('decisions')
@ApiBearerAuth()
@Controller('decisions')
@UseGuards(JwtAuthGuard)
export class DecisionsController {
  constructor(private readonly decisionsService: DecisionsService) {}

  @Post()
  create(@Req() req: Request & { user: any }, @Body() dto: CreateDecisionDto) {
    return this.decisionsService.create((req.user as any).userId, dto);
  }

  @Get()
  findAll(@Req() req: Request & { user: any }) {
    return this.decisionsService.findAll((req.user as any).userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.decisionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDecisionDto) {
    return this.decisionsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.decisionsService.remove(id);
  }
}
