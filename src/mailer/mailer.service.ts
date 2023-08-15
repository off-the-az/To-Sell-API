import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MaillerService {
  constructor(private readonly mailService: MailerService) {}

  async sendVarificationMail(userMail: string, username: string) {
    await this.mailService
      .sendMail({
        to: userMail,
        from: process.env.MAIL_USERNAME,
        subject: '',
        template:  process.cwd() + '/templates/accountConfirmation',
        context: {
          username: username,
          mail: userMail,
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
