import nodemailer from "nodemailer";

import "dotenv/config";

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export function sendMail(receiver, mailSubject, mailContentHTML) {
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: receiver,
    subject: mailSubject,
    html: mailContentHTML,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error sending e-mail:", error);
    }
    console.log("E-mail sent:", info.response);
  });
}
