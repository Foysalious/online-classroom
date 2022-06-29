import * as nodemailer from 'nodemailer';
require('dotenv').config()
export class SendMail {

  async sentMail(password: string, email: string) {
   var transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 2525,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    });

    let info = await transport.sendMail({
      from: '"CLASSROOM" <foo@example.com>', // sender address
      to: email,
      subject: "Confidential, Online Classroom Password", // Subject line
      text: "Your classroom password: " + password, // plain text body
    });
  }
}