// import prisma from "@/db";
import { createNftForEvent } from "@/lib/NFT/creatEventProject";
import { Event, Ticket } from "@prisma/client";


export async function buyEventTicket(event: Event, ) {
    try {
        console.log("event", event);
        // check if the user has bought a token already for this event
        // then say only one token can be bought per event


    let NFT = await createNftForEvent(event, "DEf6iVevtsoN3yBbovuZKHVMHQ3cmsZNiKoHUW41oNnh"  );
    // console.log("NFT", NFT)
      // const events = await prisma.ticket.create({
      //   data: {
      //     name: "test",
      //     email: "test",
      //     eventId: "test",
      //   },
      // })
      return { type: 'success' };
    } catch (error) {
      console.error('Get events error:', error);
      return { type: 'error', resultCode: 'SERVER_ERROR' };
    }
  }