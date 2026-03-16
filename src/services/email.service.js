require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify transporter
transporter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to email server:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// Generic email function
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend Ledger" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Registration email
async function sendRegistrationEmail(userEmail, name) {
  const subject = "Welcome to Backend Ledger ";

  const text = `Hello ${name},
  
Welcome to Backend Ledger!

Your account has been successfully created.

We are excited to have you with us.

Best Regards  
Backend Ledger Team`;

  const html = `
    <h2>Hello ${name} </h2>
    <p>Welcome to <b>Backend Ledger</b>.</p>
    <p>Your account has been <b>successfully created</b>.</p>
    <p>We are excited to have you on board.</p>
    <br/>
    <p>Best Regards,<br/>Backend Ledger Team</p>
  `;

  await sendEmail(userEmail, subject, text, html);
}

module.exports = {
  sendEmail,
  sendRegistrationEmail,
};