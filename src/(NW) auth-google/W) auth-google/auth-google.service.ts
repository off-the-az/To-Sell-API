import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { AuthGoogleLoginDto } from './dto/auth-google-login.dto';
import { SocialInterface } from 'src/(NW) social/interfaces/social.interface';
import { AllConfigType } from 'src/config/(NW) config.type';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../../.env' });

@Injectable()
export class AuthGoogleService {
  private google: OAuth2Client;

  constructor(private configService: ConfigService<AllConfigType>) {
    this.google = new OAuth2Client({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    });
  }

  async login(@Res() response): Promise<any> {
    const scopes = ['https://www.googleapis.com/auth/webmasters'];
    const url = this.google.generateAuthUrl({
      access_type: 'online',
      scope: scopes,
    });
    response.redirect(url);
  }

  async getProfileByToken(
    loginDto: AuthGoogleLoginDto,
  ): Promise<SocialInterface> {
    const ticket = await this.google.verifyIdToken({
      idToken: loginDto.idToken,
      audience: [process.env.GOOGLE_CLIENT_ID],
    });

    const data = ticket.getPayload();

    if (!data) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user: 'wrongToken',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return {
      id: data.sub,
      email: data.email,
      firstName: data.given_name,
      lastName: data.family_name,
    };
  }
}
