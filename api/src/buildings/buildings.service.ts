import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';

@Injectable()
export class BuildingsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateBuildingDto) {
    return this.prisma.building.create({ data: dto });
  }

  findAll() {
    return this.prisma.building.findMany();
  }

  findOne(id: string) {
    return this.prisma.building.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateBuildingDto) {
    return this.prisma.building.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.building.delete({ where: { id } });
  }
}
