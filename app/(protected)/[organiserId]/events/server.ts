'use server'

import { getEventById, getEvents, getEventsByOrganisationId } from "@/db/events"



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
