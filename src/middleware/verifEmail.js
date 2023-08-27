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

const sendEmail = async (email_client, name, url) => {
    let mailOption = {
        from: `"Recipe App" <${process.env.EMAIL_NAME}>`,
        to: email_client,
        subject: `Activation email for ${name}`,
        html: `Hello <b>${name}</b>, here is link to activating the account <i><a href="${url}">click here</a><i>`,
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