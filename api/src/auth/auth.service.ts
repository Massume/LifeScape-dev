import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { UsersService } from "../users/users.service";
import { RegisterDto } from "./dto/register.dto";
import { ConfirmEmailDto } from "./dto/confirm-email.dto";
import { LoginDto } from "./dto/login.dto";
import { GoogleLoginDto } from "./dto/google-login.dto";
import { OAuth2Client } from "google-auth-library";

@Injectable()
export class AuthService {
  private readonly codes = new Map<string, string>();
  private readonly oauthClient = new OAuth2Client();

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new BadRequestException("Email already registered");
    }
    const passwordHash = await bcrypt.hash(dto.password, 10);
    await this.prisma.user.create({
      data: { email: dto.email, passwordHash },
    });
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    this.codes.set(dto.email, code);
    console.log(`Confirmation code for ${dto.email}: ${code}`);
    return { message: "Confirmation code sent" };
  }

  async confirmEmail(dto: ConfirmEmailDto) {
    const stored = this.codes.get(dto.email);
    if (!stored || stored !== dto.code) {
      throw new BadRequestException("Invalid code");
    }
    await this.prisma.user.update({
      where: { email: dto.email },
      data: { isVerified: true },
    });
    this.codes.delete(dto.email);
    return { message: "Email confirmed" };
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return null;
    }
    if (!user.isVerified) {
      throw new BadRequestException("Email not verified");
    }
    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);
    if (!user) {
      throw new BadRequestException("Invalid credentials");
    }
    return this.signUser(user.id, user.email);
  }

  async google(dto: GoogleLoginDto) {
    const ticket = await this.oauthClient.verifyIdToken({
      idToken: dto.idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) throw new BadRequestException("Invalid Google token");
    let user = await this.prisma.user.findUnique({
      where: { googleId: payload.sub! },
    });
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: payload.email!,
          googleId: payload.sub!,
          passwordHash: "",
          isVerified: true,
        },
      });
    }
    return this.signUser(user.id, user.email);
  }

  private async signUser(userId: string, email: string) {
    const payload = { sub: userId, email };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
