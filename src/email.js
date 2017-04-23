const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'healthchainrx@gmail.com',
        pass: "<healthchain passsword>">
    }
});

sendEmail("t.williams.im@gmail.com", "hello world")

function sendEmail(email, message){
    // setup email data with unicode symbols
  let mailOptions = {
      from: '"healthchainrx" <healthchainrx@gmail.com>', // sender address
      to: email, // list of receivers
      subject: 'Prescription Qr Code', // Subject line
      text: message, // plain text body
      html: message // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
}
