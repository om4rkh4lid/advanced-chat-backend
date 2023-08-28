import { Body, Controller, Post } from "@nestjs/common";
import { OrganicLoginCredentials } from "./dto/OrganicLoginCredentials";
import { GoogleLoginCredentials } from "./dto/GoogleLoginCredentials";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  handleOrganicLogin(@Body() body: OrganicLoginCredentials) {
    return this.authService.handleOrganicLogin(body);
  }

  @Post('login/google')
  async handleGoogleLogin(@Body() body: GoogleLoginCredentials) {
    return await this.authService.handleGoogleLogin(body);
  }
}