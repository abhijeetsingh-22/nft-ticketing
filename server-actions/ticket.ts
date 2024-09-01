"use server";

import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";
import bs58 from "bs58";
import { auth } from "@/auth";
import prisma from "@/db";

//TODO: Use this function to get the tickets by wallet
export async function getTicketsByWallet(publicKey: string) {
  try{
  const userWalletPublicKey = new PublicKey(publicKey)
  const connection = new Connection(clusterApiUrl("devnet"));
  const metaplex = new Metaplex(connection);
  const nfts = await metaplex.nfts().findAllByOwner({ owner: userWalletPublicKey, });

  if (!nfts || nfts.length === 0) {
    return { status: "error", message: "No NFTs found in the given wallet" };
  }

  const tickets = nfts.map(nft => ({
    tokenId: nft.address.toString(),
    name: nft.name,
    symbol: nft.symbol,
    uri: nft.uri,
  }));

		return { status: "success", tickets }
	} catch (error) {
		console.error("Error fetching tickets:", error)
		return { status: "error", message: "Failed to fetch tickets" }
	}
}

export async function getUserTickets(){
  try{
    const session = await auth();
    if(!session){
      return {status: "error", message: "Unauthorized"}
    }
    
    const tickets = await prisma.ticket.findMany({  
      where: {
        userId: session.user.id
      }
    })

    return {status: "success", tickets}

  }catch(error){
    console.error("Error fetching user tickets:", error)
    return {status: "error", message: "Failed to fetch user tickets"}
  }
}