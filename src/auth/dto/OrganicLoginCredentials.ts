import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class OrganicLoginCredentials {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  @IsString()
  password: string;
}