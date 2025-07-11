import "dotenv/config";

import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export function sendMail(receiver, mailSubject, mailContentHTML) {
  if (!process.env.EMAIL_SERVICE) {
    console.warn("E-mail service is not configured. Mail not sent.");
    return;
  }

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
