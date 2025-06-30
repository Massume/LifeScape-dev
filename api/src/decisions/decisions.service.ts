import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDecisionDto } from './dto/create-decision.dto';
import { UpdateDecisionDto } from './dto/update-decision.dto';

@Injectable()
export class DecisionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, dto: CreateDecisionDto) {
    return this.prisma.decision.create({ data: { ...dto, userId } });
  }

  findAll(userId: string) {
    return this.prisma.decision.findMany({ where: { userId } });
  }

  findOne(id: string) {
    return this.prisma.decision.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateDecisionDto) {
    return this.prisma.decision.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.decision.delete({ where: { id } });
  }
}
