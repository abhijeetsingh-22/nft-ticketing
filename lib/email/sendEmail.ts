import { Resend } from 'resend';
import { generateBookingEmailBody } from './emailBody';
import { Event } from '@prisma/client';

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
