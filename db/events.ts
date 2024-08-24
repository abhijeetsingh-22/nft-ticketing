'use server';
import prisma from "@/db";
import { createEventProject } from "@/lib/NFT/creatEventProject";
import { Event } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createOrUpdateEvent(event: Event) {
  try {
    console.log("event", event);

    const isNewEvent: Event | null = await prisma.event.findUnique({
      where: { slug: event.slug },
    })

    // Creating a new event on chain
    if (!(isNewEvent && Object.keys(isNewEvent).length)) {
      let response = await createEventProject(event);
      if(response.code === 200) {
        // event.projectId = response.data.projectId;
        // event.mintAddress = response.data.mintAddress;
        // event.nftSymbol = response.data.nftSymbol;
      }
      else {
        throw new Error(response.message);
      }
    }


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
      },
      create: {
        name: event.name,
        slug: event.slug,
        startDate: event.startDate,
        entryDate: event.entryDate,
        endDate: event.endDate,
        venueName: event.venueName,
        state: event.state,
        liveStatus: event.liveStatus,
        publicVisibility: event.publicVisibility,
        endedStatus: event.endedStatus,
        coverPhoto: event.coverPhoto,
        thumbnail: event.thumbnail,
        description: event.description,
        organizerId: event.organizerId,
      },
    });

    revalidatePath('/')
    return { type: 'success', resultCode: 'EVENT_CREATED', eventId: newEvent.id };

  } catch (error) {
    console.error('Create event error:', error);
    throw error
    // return { type: 'error', resultCode: 'SERVER_ERROR' };
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
