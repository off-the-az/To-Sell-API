import { Controller } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Controller('api/mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}
}
