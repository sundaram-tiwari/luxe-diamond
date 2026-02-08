const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const sendMail = async ({ to, subject, template, data }) => {
    var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.MY_EMAIL_USER,
            pass: process.env.MY_EMAIL_PASS
        }
    });

    const templatePath = path.join(
        __dirname,
        "../views/emails",
        `${template}.ejs`
    );

    const html = await ejs.renderFile(templatePath, data);

    const receiver = {
        from: "info@luxediamond.com",
        to,
        subject,
        html
    }

    await transporter.sendMail(receiver);
};

module.exports = sendMail;