import { Event } from "@prisma/client";

export const generateBookingEmailBody = (event: Event): string => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h1 style="color: #007BFF;">Booking Confirmation</h1>
      <p><strong>Event Name:</strong> ${event.name}</p>
      <p><strong>Start Date:</strong> ${new Date(event.startDate).toLocaleDateString()}</p>
      <p><strong>End Date:</strong> ${new Date(event.endDate).toLocaleDateString()}</p>
      <p><strong>Description:</strong> ${event.description}</p>
      <p><strong>Venue:</strong> ${event.venueName}</p>
      <p><strong>Address:</strong> ${event.venueAddress}, ${event.zipCode}</p>
      <p><strong>Organizer:</strong> ${event.organizerId}</p>
      <p><strong>Number of Tickets Available:</strong> ${event.numberOfTickets}</p>
      <p><strong>Ticket Price:</strong> $${event.ticketPrice.toFixed(2)}</p>
      <p><strong>Cover Photo:</strong></p>
      <img src="${event.coverPhoto}" alt="Cover Photo" style="max-width: 100%; height: auto;" />
      <p><strong>Thumbnail:</strong></p>
      <img src="${event.thumbnail}" alt="Thumbnail" style="max-width: 100%; height: auto;" />
      <p><strong>Booking Date:</strong> ${new Date().toLocaleDateString()}</p>
    </div>
  `;
}
