import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UsersRoleModule } from './users-role/users-role.module';
import * as dotenv from 'dotenv';
import { UsersRole } from './users-role/entities/users-role.entity';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './users-role/guards/userrs-role.guard';
import { MulterModule } from '@nestjs/platform-express';
import { FileManagerModule } from './file-manager/file-manager.module';
import { SmtpModule } from './smtp/smtp.module';
dotenv.config({ path: __dirname + '/../../../.env' });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [
        User,
        UsersRole,
      ],
      synchronize: true,
    }),
    UserModule,
    UsersRoleModule,
    AuthModule,
    MulterModule.register({
      dest: '../upload',
    }),
    FileManagerModule,
    SmtpModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
