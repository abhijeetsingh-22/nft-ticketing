'use server';
import prisma from "@/db";
import { Event } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createEvent(event: Event) {
  try {
    const newEvent = await prisma.event.create({
      data: {
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
    return { type: 'error', resultCode: 'SERVER_ERROR' };
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
