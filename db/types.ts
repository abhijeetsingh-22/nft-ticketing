import { Ticket, Event } from "@prisma/client";

export type TicketWithEvent = Ticket & {
	event: Event;
};