'use server';
import prisma from "@/db";
import { Event } from "@prisma/client";
import { revalidatePath } from "next/cache";

const createNftSymbol = (eventName: string): string => {
  let sanitizedEventName = eventName.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

  // Limit the symbol to a maximum length of 4
  const maxLength = 4;
  let symbol = sanitizedEventName.slice(0, maxLength);

  // If the event name is too short, add padding (optional)
  if (symbol.length < maxLength) {
    symbol = symbol.padEnd(maxLength, 'X'); // Pads with 'X'
  }

  return symbol;
}


export async function createOrUpdateEvent(event: Event) {
  try {

    const existingEvent: Event | null = await prisma.event.findUnique({
      where: { slug: event.slug },
    });

    // Check if the event exists and if tickets have been sold
    if (existingEvent && existingEvent.numberOfTicketsSold > 0) {
      throw new Error("Cannot update event with tickets already sold");
    }


    // Create NFT symbol
    event.nftSymbol = createNftSymbol(event.name);

    const newEvent = await prisma.event.upsert({
      where: { slug: event.slug },
      update: {
        name: event.name,
        slug: event.slug,
        startDate: event.startDate,
        entryDate: event.entryDate,
        endDate: event.endDate,
        venueName: event.venueName,
        state: event.state,
        numberOfTickets: event.numberOfTickets,
        ticketPrice: event.ticketPrice,
        coverPhoto: event.coverPhoto,
        thumbnail: event.thumbnail,
        description: event.description,
        organizerId: event.organizerId,
        venueAddress: event.venueAddress,
        zipCode: event.zipCode,
        nftSymbol: event.nftSymbol
      },
      create: {
        name: event.name,
        slug: event.slug,
        startDate: event.startDate,
        entryDate: event.entryDate,
        endDate: event.endDate,
        venueName: event.venueName,
        state: event.state,
        numberOfTickets: event.numberOfTickets,
        ticketPrice: event.ticketPrice,
        liveStatus: event.liveStatus,
        publicVisibility: event.publicVisibility,
        endedStatus: event.endedStatus,
        coverPhoto: event.coverPhoto,
        thumbnail: event.thumbnail,
        description: event.description,
        organizerId: event.organizerId,
        nftSymbol: event.nftSymbol,
        venueAddress: event.venueAddress,
        zipCode: event.zipCode
      },
    });

    revalidatePath('/')
    return { type: 'success', resultCode: 'EVENT_CREATED', eventId: newEvent.id };

  } catch (error) {
    console.error('Create event error:', error);
    throw error
  }
}

export async function getEvents() {
  try {
    const events = await prisma.event.findMany();
    return { type: 'success', events };
  } catch (error) {
    console.error('Get events error:', error);
    return { type: 'error', resultCode: 'SERVER_ERROR' };
  }
}

export async function getEventById(eventId: string) {
  try {
    console.log("eventId", eventId);

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (event) {
      return { type: 'success', event };
    } else {
      return { type: 'error', resultCode: 'EVENT_NOT_FOUND' };
    }
  } catch (error) {
    console.error('Get event by ID error:', error);
    return { type: 'error', resultCode: 'SERVER_ERROR' };
  }
}

export async function getEventsByOrganisationId(organizerId: string) {
  try {
    const events = await prisma.event.findMany({
      where: { organizerId },
    });

    return { type: 'success', events };
  } catch (error) {
    console.error('Get events by organisation ID error:', error);
    return { type: 'error', resultCode: 'SERVER_ERROR' };
  }
}

export async function getEventBySlug(slug: string) {
  try {
    const event = await prisma.event.findUnique({
      where: { slug },
    });

    if (event) {
      return { type: 'success', event };
    } else {
      return { type: 'error', resultCode: 'EVENT_NOT_FOUND' };
    }
  } catch (error) {
    console.error('Get event by slug error:', error);
    return { type: 'error', resultCode: 'SERVER_ERROR' };
  }
}

export async function getAllPublicEvents() {
  try {
    const events = await prisma.event.findMany({
      // where: { publicVisibility: true },
    });

    return { type: 'success', events };
  } catch (error) {
    console.error('Get all public events error:', error);
    return { type: 'error', resultCode: 'SERVER_ERROR' };
  }
}
