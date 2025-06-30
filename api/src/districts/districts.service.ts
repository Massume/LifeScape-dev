import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';

@Injectable()
export class DistrictsService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, dto: CreateDistrictDto) {
    return this.prisma.district.create({ data: { ...dto, userId } });
  }

  findAll(userId: string) {
    return this.prisma.district.findMany({ where: { userId } });
  }

  findOne(id: string) {
    return this.prisma.district.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateDistrictDto) {
    return this.prisma.district.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.district.delete({ where: { id } });
  }
}
