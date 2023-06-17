const nodemailer = require("nodemailer");
require("dotenv").config();

const { GMAIL_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: "samaloanastasia@gmail.com",
    pass: GMAIL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (data) => {
  const mail = { ...data, from: "samaloanastasia@gmail.com" };

  transport
    .sendMail(mail)
    .then(() => console.log("Email send success"))
    .catch((error) => console.log(error.message));
};

module.exports = sendEmail;
