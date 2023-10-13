const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'mail.project13.my.id',
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_NAME,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTP = async (email_client, name, code) => {
  let mailOption = {
    from: `"Recipe App" <${process.env.EMAIL_NAME}>`,
    to: email_client,
    subject: `Change Password For ${name}`,
    html: `
        <div style="margin: 50px auto; width: 300px; background-color: #fff8e7; padding: 15px;border-radius: 15px; box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5); font-size:larger;">
        <img src="https://i.ibb.co/ZcsX3g3/fix.png" alt="Logo Recipe" width="150" height="150" style="display: block; margin: 0 auto;">
        <h3>Hello, <b>${name}</b></h3>
        <p>Have you requested a password reset for your account at <strong>Mama Recipe</strong>? Don't give this code to anyone:</p>
        <div style="background-color: #EFC81A; border-radius: 10px;padding: 10px; color: white;">${code}</div>
        <p>If you feel that you have not requested to reset your account password, please ignore this email.</p>
        <br>
        <p>Best regards,</p>
        <strong>Mahardhika Putra Pratama</strong>
        <p style="padding: 0;margin: 0;">(Administrator)</p>
        </div>
        `,
  };

  try {
    let info = await transporter.sendMail(mailOption);
    console.log('Email sent:', info.response);
    return info.response;
  } catch (error) {
    console.log('Error sending email:', error);
    throw error;
  }
};

module.exports = sendOTP;
