import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerOptions } from "@nestjs-modules/mailer";
import * as process from "node:process";
import * as dotenv from 'dotenv';
dotenv.config({ path: process.cwd() + '/.env' });

export const getMailConfig : MailerOptions = {
    transport:{
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      }
    },
    defaults: {
      from: `"No Reply <no-reply@tosell.pp.ua>`,
    },
    preview: true,
    template: {
      dir: process.cwd() + '../../../../templates',
      adapter: new HandlebarsAdapter(),
      options: {
        strict: false,
      },
    },
};