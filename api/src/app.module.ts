import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { DistrictsModule } from "./districts/districts.module";
import { StreetsModule } from "./streets/streets.module";
import { BuildingsModule } from "./buildings/buildings.module";
import { DecisionsModule } from "./decisions/decisions.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    DistrictsModule,
    StreetsModule,
    BuildingsModule,
    DecisionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
