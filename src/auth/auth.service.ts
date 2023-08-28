import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { OrganicLoginCredentials } from "./dto/OrganicLoginCredentials";
import { GoogleLoginCredentials } from "./dto/GoogleLoginCredentials";
import { users } from "src/users";
import { GoogleSignInService } from "./google/google.service";
import { PrismaService } from "nestjs-prisma";
import { createToken } from "src/utils/helpers/createToken";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "src/users/users.service";
import { compare } from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private googleService: GoogleSignInService,
    private userService: UsersService,
    private config: ConfigService
  ) { }

  private createSignedToken = createToken(this.config.get('jwt.secret'));

  async handleOrganicLogin(credentials: OrganicLoginCredentials) {
    const user = await this.userService.findByEmailOrThrow(credentials.email)

    // A user who doesn't have a password has been registered using a social account
    const isValidPassword = user.password && await compare(credentials.password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const token = await this.createSignedToken({ id: user.id, email: user.email });

    return { token, user };
  }

  async handleGoogleLogin(credentials: GoogleLoginCredentials) {
    const payload = await this.googleService.decodeToken(credentials.token);
    const user = await this.userService.findByEmailOrThrow(payload.email);
    // A user that has a password hasn't been registered using a social account
    if (user.password) {
      throw new UnauthorizedException("A user with this email already exists");
    }
    return { user };
  }
}