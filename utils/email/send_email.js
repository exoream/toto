const { createTransport } = require("nodemailer");
const fs = require("fs");
const path = require("path");
const cheerio = require('cheerio');

require("dotenv").config();

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOtp = async (userEmail, otp) => {
  const htmlTemplate = fs.readFileSync(
    path.join(__dirname, "../template/otp_template.html"),
    "utf-8"
  );
  const formattedHtml = htmlTemplate.replace("{{.Otp}}", otp);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Your OTP Code",
    html: formattedHtml,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendVerificationEmail = async (userEmail, verificationToken) => {
  const htmlTemplate = fs.readFileSync(
    path.join(__dirname, "../template/verification_template.html"),
    "utf-8"
  );

  // Generate the verification link
  const verificationLink = `https://api.trototrack.online/verify?token=${verificationToken}`;
  const formattedHtml = htmlTemplate.replace(/{{\.VerificationLink}}/g, verificationLink);

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Email Verification",
    html: formattedHtml,
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent: " + info.response);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};


module.exports = { sendOtp, sendVerificationEmail };
