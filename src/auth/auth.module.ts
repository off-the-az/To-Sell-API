import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { UserModule } from 'src/user/user.module';
dotenv.config({ path: __dirname + '/../../.env' });

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.AUTH_JWT_SECRET,
      global: true,
      signOptions: {
        expiresIn: '60s',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
