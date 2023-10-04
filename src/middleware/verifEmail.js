const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "mail.project13.my.id",
    secure: true,
    port: 465,
    auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = async (email_client, name, url, code) => {
    let mailOption = {
        from: `"Recipe App" <${process.env.EMAIL_NAME}>`,
        to: email_client,
        subject: `Activation email for ${name}`,
        html: `
        <div style="text-align: center;">
        <img src="https://i.ibb.co/ZcsX3g3/fix.png" alt="Logo Recipe" width="150" height="150" style="display: block; margin: 0 auto;">
        </div>
        <br>
        Hello <b>${name}</b>,<br>
        Here is the code to activate Email, copy this:<br>
        <blockquote>
        <span style="background-color: yellow"><strong>${code}</strong></span>
        </blockquote><br>
        Or you can click this link to activate email <i><a href="${url}">click here</a></i>.<br>
        Thank you for your trust in using our services.<br>
        <strong>Mahardhika Putra P</strong>
        `,
    };

    try {
        let info = await transporter.sendMail(mailOption);
        console.log("Email sent:", info.response);
        return info.response;
    } catch (error) {
        console.log("Error sending email:", error);
        throw error;
    }
};

module.exports = sendEmail