import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { BuildingsService } from './buildings.service';
import { BuildingsController } from './buildings.controller';

@Module({
  imports: [PrismaModule],
  providers: [BuildingsService],
  controllers: [BuildingsController],
})
export class BuildingsModule {}
