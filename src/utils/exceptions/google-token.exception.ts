import { HttpCode, HttpException, HttpStatus } from "@nestjs/common";

export class GoogleTokenException extends HttpException {
  constructor() {
    super("Invalid Google token.", HttpStatus.BAD_REQUEST);
  }
}