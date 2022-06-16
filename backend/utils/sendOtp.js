const nodemailer = require("nodemailer");

const sendOtpViaMail = async (to, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: "rwfmcapmo@gmail.com",
      pass: "yfkrhkvqahbtfzpa",
    },
  });
  const mailOptions = {
    from: "rithikavijaykumar@gmail.com",
    to,
    subject: "Verify Otp for Attendance",
    text: `
        Your Otp is ${otp}
        `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error(error.message);
    }
  });
};
module.exports = sendOtpViaMail;
