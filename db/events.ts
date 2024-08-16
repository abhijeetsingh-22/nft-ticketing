'use server';
import prisma from "@/db";

export async function createEvent({
  name,
  date,
  location,
  description,
  organizerId,
}: {
  name: string;
  date: Date;
  location: string;
  description: string;
  organizerId: number;
}) {
  try {
    // const newEvent = await prisma.event.create({
    //   data: {
    //     name,
    //     date,
    //     location,
    //     description,
    //     organizerId,
    //     updatedAt: new Date(),
    //   },
    // });
    // return { type: 'success', resultCode: 'EVENT_CREATED', eventId: newEvent.id };

    return { type: 'success', resultCode: 'EVENT_CREATED', eventId: 1 };
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
