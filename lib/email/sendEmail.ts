"use server"
import { Resend } from 'resend';
import { generateBookingEmailBody } from './emailBody';
import { Event } from '@prisma/client';
import nodemailer, { Transporter } from 'nodemailer';

let resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) throw new Error('RESEND_API_KEY must be set');

const resend = new Resend(resendApiKey);


export async function sendBookingEmail(to: string[], subject: string, event: Event): Promise<void> {
    // Generate the email body
    const emailBody = generateBookingEmailBody(event);
    
    // Setup email data
    const msg = {
        from: 'no-reply@minttix.com', // Verified sender address
        to, // Recipient's email address in Array
        subject, // Subject line
        html: emailBody, // HTML body content
    };

    // Send email
    try {
        await resend.emails.send(msg);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email: ', error);
    }
}


export const sendEmailUsingNodemailer = async (email: string, subject: string, html: string): Promise<boolean> => {
  try {
    if(!email || !html || !subject) return false

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
