import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { StreetsService } from './streets.service';
import { StreetsController } from './streets.controller';

@Module({
  imports: [PrismaModule],
  providers: [StreetsService],
  controllers: [StreetsController],
})
export class StreetsModule {}
