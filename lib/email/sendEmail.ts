import nodemailer, { Transporter } from 'nodemailer';

export const sendEmailUsingNodemailer = async (email: string, subject: string, html: string): Promise<boolean> => {
  try {
    if (!email || !html || !subject) return false

    // console.log(process.env.NEXT_PUBLIC_ADMIN_EMAIL, process.env.NEXT_PUBLIC_ADMIN_EMAIL_PASSWORD)
    // Transporter with your SMTP settings
    const transporter: Transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NEXT_PUBLIC_ADMIN_EMAIL, // Ensure the environment variable names match
        pass: process.env.NEXT_PUBLIC_ADMIN_EMAIL_PASSWORD,
      },
    });

    // Define the email options
    const mailOptions = {
      from: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
      to: email,
      subject: subject,
      html: html,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent: ' + info.response);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
