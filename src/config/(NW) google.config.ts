import { registerAs } from '@nestjs/config';
import { GoogleConfig } from './(NW) config.type';
import validateConfig from 'src/(NW) utils/validate-config';

class EnvironmentVariablesValidator {
  GOOGLE_CLIENT_ID: string;

  GOOGLE_CLIENT_SECRET: string;
}

export default registerAs<GoogleConfig>('google', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
});
