import * as nodemailer from 'nodemailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SendMailDto } from './dto/send-mail.dto';
import axios from 'axios';

@Injectable()
export class MailService {
  async sendMail(dto: SendMailDto) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });


    try {
      const info = await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: dto.to,
        subject: dto.subject,
        html: dto.message,
      });
      return { messageId: info.messageId };
    } catch (error) {
      console.error('ERROR REAL GMAIL:', error);
      throw new InternalServerErrorException(error.message);
    }

  }

    async fetchUserListFromPublicApi() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    return res.data;
    }

}
