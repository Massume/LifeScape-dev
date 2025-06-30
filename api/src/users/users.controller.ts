import { Body, Controller, Get, Patch, UseGuards, Req } from "@nestjs/common";
import { Request } from "express";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/strategies/jwt-auth.guard";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";

@ApiTags("users")
@ApiBearerAuth()
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get("me")
  me(@Req() req: Request & { user: any }) {
    return this.usersService.findById((req.user as any).userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("me")
  update(@Req() req: Request & { user: any }, @Body() dto: UpdateUserDto) {
    return this.usersService.update((req.user as any).userId, dto);
  }
}
