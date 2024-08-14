import { Module } from '@nestjs/common';
import { SmtpService } from './smtp.service';
import { SmtpController } from './smtp.controller';
import { MailerModule } from "@nestjs-modules/mailer";
import { getMailConfig } from "../configs/getMailConfig";

@Module({
  imports: [MailerModule.forRoot(getMailConfig)],
  controllers: [SmtpController],
  providers: [SmtpService],
  exports: [SmtpService]
})
export class SmtpModule {
}
