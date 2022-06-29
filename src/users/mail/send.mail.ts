import * as nodemailer from 'nodemailer';
require('dotenv').config()
export class SendMail {

  createTransport(){
    return nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 2525,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    });
  }
  async sentMail(password: string, email: string) {
   const transport = this.createTransport()

    let info = await transport.sendMail({
      from: '"CLASSROOM" <test@strativ.com>', 
      to: email,
      subject: "Confidential, Online Classroom Password", 
      text: "Your classroom password: " + password, 
    });
  }

  async sentStudentMail(email) {
    const transport = this.createTransport()
 
     let info = await transport.sendMail({
       from: '"CLASSROOM" <test@strativ.com>', 
       to: email,
       subject: "Exam", 
       text: "You have an Upcoming Exam "  
     });
   }
}