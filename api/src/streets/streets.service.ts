import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStreetDto } from './dto/create-street.dto';
import { UpdateStreetDto } from './dto/update-street.dto';

@Injectable()
export class StreetsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateStreetDto) {
    return this.prisma.street.create({ data: dto });
  }

  findAll() {
    return this.prisma.street.findMany();
  }

  findOne(id: string) {
    return this.prisma.street.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateStreetDto) {
    return this.prisma.street.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.street.delete({ where: { id } });
  }
}
