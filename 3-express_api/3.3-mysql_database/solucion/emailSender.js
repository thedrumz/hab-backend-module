const nodemailer = require("nodemailer");

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});

const accountConfirmationEmail = async ({ sendTo, code }) => {
  await transporter.sendMail({
    from: 'elantiswing@hotmail.com <elantiswing@hotmail.com>',
    to: sendTo,
    subject: "Confirm your account",
    html: `<p>Click <a href="http://localhost:3000/auth/confirm?code=${code}=">here</a> to confirm your account</p>`
  });
}

module.exports = {
  accountConfirmationEmail
}