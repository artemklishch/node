require("dotenv").config();
const nodemailer = require("nodemailer");

//step 1
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

//step 2
let mailOptions = {
  from: "test1@gmail.com",
  to: "devartemklishch@gmail.com",
  subject: "Testing and Testing",
  text: "It works",
};

//step 3
transporter.sendMail(mailOptions, function (err, data) {
  if (err) {
    console.log("Error occures", err);
  } else {
    console.log("Sent a message");
  }
});
