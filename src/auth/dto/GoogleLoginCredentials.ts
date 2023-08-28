import { IsNotEmpty, IsString } from "class-validator";

export class GoogleLoginCredentials {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  clientId: string;
}