const nodemailer = require("nodemailer");

const mailSender = async (options, redirectLink) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const message = {
    from: 'clarissekayitesi23@outlook.com', // sender address
    to: options.email, // email receivers
    subject: redirectLink ? process.env.subject1 : process.env.subject2, // Subject line
    text: redirectLink
      ? `hello ${options.name}\n
      please click to this link to confirm you account ${redirectLink}`
      : `To ${options.name}\n Your Business Idea have been ${options.status}
      Please come to our office for fother process.`,
  };
  const info = await transporter.sendMail(message);
  console.log("Message sent: %s", info.messageId);
};
module.exports = mailSender;
