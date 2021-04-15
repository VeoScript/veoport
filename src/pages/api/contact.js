export default function (req, res) {
  require('dotenv').config()

  let nodemailer = require('nodemailer')

  const transporter = nodemailer.createTransport({
    port: 587,
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  })

  const mailData = {
    from: req.body.email,
    to: 'jeromevillaruel1998@gmail.com',
    subject: `Message From ${req.body.name}`,
    text: req.body.message + " | Sent from: " + req.body.email,
    html: `<div>${req.body.message}</div><p>Sent from: ${req.body.email}</p>`
   }

   transporter.sendMail(mailData, (err, info) => {
    if (err) {
      console.log(err);
      res.send("error" + JSON.stringify(err));
    } else {
      console.log("mail send");
      res.send("success");
    }
  });

  res.send('success')

}