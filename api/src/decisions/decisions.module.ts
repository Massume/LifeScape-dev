import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { DecisionsService } from './decisions.service';
import { DecisionsController } from './decisions.controller';

@Module({
  imports: [PrismaModule],
  providers: [DecisionsService],
  controllers: [DecisionsController],
})
export class DecisionsModule {}
