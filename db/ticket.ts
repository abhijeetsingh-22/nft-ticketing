// import prisma from "@/db";
import { createNftForEvent } from "@/lib/NFT/creatEventProject";
import { transferNft } from "@/lib/NFT/transferNftW2W";
import { Event, Ticket } from "@prisma/client";


export async function buyEventTicket(event: Event, ) {
    try {
        console.log("event", event);
        // check if the user has bought a token already for this event
        // then say only one token can be bought per event


    // let NFT = await createNftForEvent(event, "DTqgm1i8TKmpuiBx887ChkBe7FmcqC5UE6fUYhunsRrU"  );
    // console.log("NFT", NFT)
    //NFT.data.mintAddress
    let res = await transferNft("4CqSwzNdYhsjR2sQaNUyMjtXWbkimDKdTZZhmELAfZJH")
    // console.log("NFT", NFT)
    //save mintAddress in db as tokenID(tokenMintAddress)
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