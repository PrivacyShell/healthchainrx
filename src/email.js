const nodemailer = require('nodemailer');


//let test_png = "iVBORw0KGgoAAAANSUhEUgAAADkAAAAyCAYAAADm33NGAAAAAXNSR0IArs4c6QAACXFJREFUaAXVWn1sHEcV39n78t35o04cQ6LSUtErRW6V0ITGckJkO07aikRC"

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'healthchainrx@gmail.com',
        pass: "<password>"
    }
});

const png = "data:image/png;base64,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"


//sendEmail("t.williams.im@gmail.com", "hello world", png)


//send png as formatted in the const png
function sendEmail(email, message, apng){

  //const html2 = `<h1>bar</h1><a href='${png}'>htsnre</a>`
  let mailOptions = {

      from: '"healthchainrx" <healthchainrx@gmail.com>', // sender address
      to: email,
      subject: 'Prescription Qr Code', // Subject line
      text: message, // plain text body

      attachments: [
        {   // encoded string as an attachment
          filename: 'cat.jpg',
          content: apng.split("base64,")[1],
          encoding: 'base64'
        }
      ]

  };

  transporter.sendMail(mailOptions, (error, info) => {
    console.log("ok")
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
}


// transporter.use('compile', inlineBase64({cidPrefix: 'somePrefix_'}));
// transporter.sendMail({
//     from: 'healthchainrx@gmail.com',
//     to: 'me@mattasher.com',
//     html: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAACCAYAAACE7KJkAAAAI0lEQVRYR+3DMQ0AAAgDsKlFzZxgEhOcbdIEAIBf7Y6qqn8P0MMQZPno7TMAAAAASUVORK5CYII=">'
// });
