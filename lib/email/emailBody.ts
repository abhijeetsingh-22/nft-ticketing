"use server"
import { Event } from "@prisma/client";

export const generateBookingEmailBody = (event: Event): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Minttix.in - Your NFT Event Ticket</title>
    </head>
    <body style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; line-height: 1.6; background-color: #f0f0f0; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 0; border-radius: 15px; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #6e8efb, #a777e3); padding: 30px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; text-transform: uppercase; letter-spacing: 2px;">NFT Event Ticket</h1>
                <p style="color: #ffffff; margin-top: 10px; font-size: 16px;">Your gateway to an unforgettable experience</p>
            </div>

            <div style="padding: 30px;">
                <div style="background-color: #f9f9f9; border-radius: 10px; padding: 20px; margin-bottom: 30px;">
                    <h2 style="color: #6e8efb; margin-top: 0; font-size: 24px;">${event.name}</h2>
                    <p style="font-size: 16px; color: #666; margin: 5px 0;">
                        <strong style="color: #a777e3;">When:</strong> ${new Date(event.startDate).toLocaleDateString()} - ${new Date(event.endDate).toLocaleDateString()}
                    </p>
                    <p style="font-size: 16px; color: #666; margin: 5px 0;">
                        <strong style="color: #a777e3;">Where:</strong> ${event.venueName}, ${event.venueAddress}, ${event.zipCode}
                    </p>
                </div>

                <div style="margin-bottom: 30px;">
                    <img src="${event.coverPhoto}" alt="Event Cover Photo" style="width: 100%; height: auto; border-radius: 10px; margin-bottom: 15px;" />
                    <p style="font-size: 16px; color: #666; text-align: center; font-style: italic;">${event.description}</p>
                </div>

                <div style="background-color: #f9f9f9; border-radius: 10px; padding: 20px; margin-bottom: 30px;">
                    <h3 style="color: #6e8efb; margin-top: 0; font-size: 20px;">Ticket Details</h3>
                    <p style="font-size: 16px; color: #666; margin: 5px 0;">
                        <strong style="color: #a777e3;">Price:</strong> $${event.ticketPrice.toFixed(2)}
                    </p>
                    <p style="font-size: 16px; color: #666; margin: 5px 0;">
                        <strong style="color: #a777e3;">Available Tickets:</strong> ${event.numberOfTickets}
                    </p>
                    <p style="font-size: 16px; color: #666; margin: 5px 0;">
                        <strong style="color: #a777e3;">Organizer:</strong> ${event.organizerId}
                    </p>
                </div>

                <div style="text-align: center; margin-top: 30px;">
                    <img src="${event.thumbnail}" alt="Event Thumbnail" style="width: 100px; height: 100px; border-radius: 50%; margin-bottom: 15px;" />
                    <p style="font-size: 14px; color: #666;">
                        Booking confirmed on ${new Date().toLocaleDateString()}
                    </p>
                </div>
            </div>

            <div style="background: linear-gradient(135deg, #6e8efb, #a777e3); padding: 20px; text-align: center;">
                <p style="color: #ffffff; margin: 0; font-size: 16px;">Thank you for choosing Minttix.in</p>
                <p style="color: #ffffff; margin: 5px 0 0; font-size: 14px;">Your NFT adventure awaits!</p>
            </div>
        </div>
    </body>
    </html>
  `;
}

interface ReportFormData {
  area?: string
	security?: string
	subject: string
	description: string
}


export const buildMailBodyForReportIssue = (data: ReportFormData) => {
  return `
      <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Issue Report</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #444; border-bottom: 2px solid #444; padding-bottom: 10px;">Issue Report</h1>
        
        <div style="margin-bottom: 20px;">
            <h2 style="color: #666;">Area</h2>
            <p style="background-color: #f4f4f4; padding: 10px; border-radius: 4px;">${data.area}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
            <h2 style="color: #666;">Security Level</h2>
            <p style="background-color: #f4f4f4; padding: 10px; border-radius: 4px;">${data.security}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
            <h2 style="color: #666;">Subject</h2>
            <p style="background-color: #f4f4f4; padding: 10px; border-radius: 4px;">${data.subject}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
            <h2 style="color: #666;">Description</h2>
            <p style="background-color: #f4f4f4; padding: 10px; border-radius: 4px; white-space: pre-wrap;">${data.description}</p>
        </div>
        
        <footer style="margin-top: 30px; text-align: center; font-size: 0.8em; color: #666;">
            <p>This is an automated report. Please do not reply to this email.</p>
        </footer>
    </body>
    </html>
  `
}