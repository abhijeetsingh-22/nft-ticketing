
"use server";

import { auth } from "@/auth";
import prisma from "@/db";

export  async function generateEntryCode(walletAddress: string , nftAddress:string , eventId:string){
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
        nftAddress,
        eventId,
        expiresAt: new Date(Date.now() + 30 * 1000), // 30 seconds from now
      },
    });

    return { status : "success", code: entryCode.code }
  }
  catch(error){
    return { status : "error", message : "Internal server error" };
  }
}