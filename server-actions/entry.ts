
"use server";

import { auth } from "@/auth";
import prisma from "@/db";
import { TicketWithEvent } from "@/db/types";

export  async function generateEntryCode(walletAddress: string , ticket: TicketWithEvent){
  try{
    const session = await auth();
    if(!session?.user){
      return { status : "error", message : "Unauthorized" };
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const entryCode = await prisma.entryCode.create({
      data: {
        code,
        walletAddress,
        nftAddress: ticket.tokenId,
        eventId: ticket.eventId,
        expiresAt: new Date(Date.now() + 30 * 1000), // 30 seconds from now
      },
    });
    console.log("Entry code created:", entryCode);
    return { status : "success", entryCode }
  }
  catch(error){
    return { status : "error", message : "Internal server error" };
  }
}