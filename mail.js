const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");

// Enables use of .env
require("dotenv").config();

const auth = {
  auth: {
      api_key: process.env.API_KEY,
      domain: process.env.DOMAIN
  }
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (email, name, message, cb) => {
  const mailOptions = {
    from: email,
    to: "mignunez@csumb.edu",
    subject: `Message by ${name}.`,
    text : `${message}`
  };

  transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
}

// Exporting the sendmail
module.exports = sendMail;
