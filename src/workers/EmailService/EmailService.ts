import sgMail from '@sendgrid/mail';
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);


// const msg = {
//   to: 'test@example.com',
//   from: 'test@example.com', // Use the email address or domain you verified above
//   subject: 'Sending with Twilio SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };

export class EmailService {
  constructor ()
  {sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)}

  // public async build(email: {
  //   to: string,
  //   subject: string,
  // }) {
    // const emailfrom: string = 'wanerlara1999@hotmail.com' 
  //   try {
  //     const { to, subject } = email
  //     const message = {
  //       to,
  //       from: emailfrom,
  //       subject,
  //       html: '<strong>Probando, Probando NodeJs Wardner Lara 2020</strong>'
  //     }

  //     return await sgMail.send(message);
  //   } catch (err) {
  //     console.log(`[EMAIL SERVICE]: ${err.mesagge}`);
  //   }
  // }

  public async build(email: {
    to: string,
    subject: string
  }, data: any) {
    const emailfrom: string = 'wanerlara1999@hotmail.com'; 
    try {
      const { to, subject } = email;
      const message = {
        to,
        from: emailfrom,
        subject,
        html:
        `<p>
          You're receiving this email because you (or someone else) has
          requested the reset of a password. If you requested a password reset,
          click the button below.
        </p>

          <a href="${data?.url}">
          ${data?.url}
          Reset now
          </a>`
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

