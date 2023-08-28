import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { GoogleSignInService } from "./google/google.service";
import { UsersModule } from "src/users/users.module";
import { UsersService } from "src/users/users.service";

@Module({
  imports: [UsersModule],
  exports: [],
  providers: [AuthService, GoogleSignInService, UsersService],
  controllers: [AuthController]
})
export class AuthModule {
  
}