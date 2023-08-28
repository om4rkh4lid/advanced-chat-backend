import { Exclude } from "class-transformer";

export class User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  
  @Exclude()
  password?: string;
  
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}