import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OAuth2Client } from "google-auth-library";
import { GoogleTokenException } from "src/utils/exceptions/google-token.exception";


@Injectable()
export class GoogleSignInService {
  googleClient: OAuth2Client;

  constructor(private config: ConfigService) {
    this.googleClient = new OAuth2Client();
  }

  async decodeToken(token: string) {
    try {
      const ticket = await this.googleClient.verifyIdToken({ idToken: token, audience: this.config.get('google.clientId')});
      return ticket.getPayload();
    } catch {
      throw new GoogleTokenException();
    }
  }
}