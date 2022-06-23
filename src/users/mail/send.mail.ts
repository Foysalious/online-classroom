import * as nodemailer from 'nodemailer';
export class SendMail {

    async sentMail(password:string,email:string) {
      console.log(process.env.MAIL_HOST);
      
        var transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "0d677b57beae63",
              pass: "25389694774f5c"
            }
          });
        
        let info = await transport.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: email, 
            subject: "Confidential, Online Classroom Password", // Subject line
            text: "Your classroom password: "+password, // plain text body
        });
    }
}