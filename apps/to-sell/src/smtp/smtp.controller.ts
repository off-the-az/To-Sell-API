import { Body, Controller, Post, Res } from "@nestjs/common";
import { SmtpService } from './smtp.service';

@Controller('smtp')
export class SmtpController {
  constructor(private readonly smtpService: SmtpService) {}

  @Post('send')
  async send(@Body() body: { to: string, subject: string }) {
      const {to, subject} = body;
      const emailSent = await this.smtpService.sendVarificationMail(
        to, subject
      );
  }
}
