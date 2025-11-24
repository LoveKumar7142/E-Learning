import { createTransport } from "nodemailer";
import { otpTemplate } from "../utils/otpTemplate.js";

const sendMail = async (email, subject, data) => {
  try {
    const transport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const htmlContent = otpTemplate({
      username: data.name || "User",
      otp: data.otp,
      expiryMinutes: data.expiresIn || 6,
      appName: "E-Learning", 
    });

    await transport.sendMail({
      from: process.env.GMAIL,
      to: email,
      html:htmlContent,
    });
  } catch (error) {
    console.log(error);
    console.log("error")
  }
};

export default sendMail;
