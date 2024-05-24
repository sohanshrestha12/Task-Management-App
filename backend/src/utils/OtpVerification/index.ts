import env from "../../config/env";
import nodemailer from "nodemailer";
import CustomError from "../../utils/Error";

export const sendVerificationEmail = async (userEmail: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: env.authEmail,
      pass: env.authPassword,
    },
  });
  const mailOptions = {
    from: env.authEmail,
    to: userEmail,
    subject: "Verify Your Email",
    text: `Your OTP form email verification is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Error sending email");
    throw new CustomError("Error sending email", 400);
  }
};
