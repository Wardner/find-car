import sgMail from '@sendgrid/mail';
import handlebars from 'handlebars';
import fs from 'fs';

export class EmailService {
  constructor ()
  {sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)}

  public async build(email: {
    to: string,
    subject: string,
    template: string,
  }, data: {}) {
    const emailfrom: string = 'wanerlara1999@hotmail.com'; 
    try {
      const { to, subject, template } = email;
      const templateFile = fs.readFileSync(`src/templates/${template}.html`, `utf-8`)
      const html = handlebars.compile(templateFile)(data)
      const message = {
        to,
        from: emailfrom,
        subject,
        html
      }

      return await sgMail.send(message);
    } catch (err) {
      console.log(`[EMAIL SERVICE]: ${err}`);
    }
  };
  
  
  // public build = async () => {
  //   const emailfrom: string = 'wanerlara1999@hotmail.com'
  //   let user = {email: 'wanerlara1999@gmail.com'}
  //   const msg = {
  //     to: user.email,
  //     from: emailfrom,
  //     subject: UserResponses.EMAIL_SENT,
  //     html: '<strong>prueba html</strong>',
  //   }
  //   try {
  //     await sgMail.send(msg);
  //   } catch (error) {
  //     console.error(error);
   
  //     if (error.response) {
  //       console.error(error.response.body)
  //     }
  //   }
  // };


}

