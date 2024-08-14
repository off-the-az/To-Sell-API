import { Injectable } from '@nestjs/common';
import { MailerService as Mailer } from "@nestjs-modules/mailer/";
import { getMailConfig } from "../configs/getMailConfig";

@Injectable()
export class SmtpService {
  constructor(private readonly mailService: Mailer) {}

  async sendVarificationMail(to: string, subject: string): Promise<any> {
    await this.mailService
      .sendMail({
        to: to,
        subject: '',
        template: process.cwd() + '/templates/accountConfirmation',
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(getMailConfig);
        console.log(err.toString());
      });
  }
}
