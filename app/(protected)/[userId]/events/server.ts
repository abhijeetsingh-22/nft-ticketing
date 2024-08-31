'use server'

import { getEventById, getEvents, getEventsByOrganisationId } from "@/db/events"

export async function createEventHandler(formData: FormData) {
  const name = formData.get('name') as string;
  const date = formData.get('date') as string;
  const location = formData.get('location') as string;
  const image = formData.get('image') as string;
  const description = formData.get('description') as string;
  const organisationId = formData.get('organisationId') as string;

  if (!name || !date || !location || !organisationId) {
    return 'Missing Fields';
  }

  try {
    // const event = await createEvent({
    //   name,
    //   date,
    //   location,
    //   image,
    //   description,
    //   organisationId,
    // });
    return 'Event Creation Failed';

    // return event ? 'Event Created Successfully' : 'Event Creation Failed';
  } catch (error) {
    console.error('Event creation error:', error);
    return 'Internal Server Error';
  }
}


export async function getAllEventsHandler() {
  try {
    const events = await getEvents();
    return events || 'No Events Found';
  } catch (error) {
    console.error('Error fetching events:', error);
    return 'Internal Server Error';
  }
}


export async function getEventByIdHandler(eventId: string) {
  if (!eventId) {
    return 'Event ID is required';
  }

  try {
    const event = await getEventById(eventId);
    return event || 'Event Not Found';
  } catch (error) {
    console.error('Error fetching event:', error);
    return 'Internal Server Error';
  }
}


export async function getEventsByOrganisationIdHandler(organizerId: string) {
  if (!organizerId) {
    return 'Organisation ID is required';
  }

  try {
    const events = await getEventsByOrganisationId(organizerId);
    return events || 'No Events Found';
  } catch (error) {
    console.error('Error fetching events:', error);
    return 'Internal Server Error';
  }
}
