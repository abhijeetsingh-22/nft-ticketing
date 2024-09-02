"use server"

import {auth} from "@/auth"
import prisma from "@/db"
import {TicketWithEvent} from "@/db/types"
import { Metaplex } from "@metaplex-foundation/js"
import { Connection, PublicKey } from "@solana/web3.js"

export async function generateEntryCode(walletAddress: string, ticket: TicketWithEvent) {
	try {
		const session = await auth()
		if (!session?.user) {
			return {status: "error", message: "Unauthorized"}
		}
    const connection = new Connection(process.env.SOLANA_RPC_URL!, "confirmed")		
    const metaplex = new Metaplex(connection)

    const nft = await metaplex.nfts().findByMint({mintAddress: new PublicKey(ticket.tokenId)})
    console.log("nft", nft)
    if(!nft) {
      return {status: "error", message: "NFT not found"}
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString()
		const entryCode = await prisma.entryCode.create({
			data: {
				code,
				walletAddress,
				nftAddress: ticket.tokenId,
				eventId: ticket.eventId,
				expiresAt: new Date(Date.now() + 30 * 1000), // 30 seconds from now
			},
		})
		console.log("Entry code created:", entryCode)
		return {status: "success", entryCode}
	} catch (error) {
		return {status: "error", message: "Internal server error"}
	}
}

export async function validateEntryCode(code: string, eventId: string) {
	try {
		console.log("Validating entry code:", code)
		const session = await auth()
		if (!session?.user) {
			return {status: "error", message: "Unauthorized"}
		}
		console.log("Session user:", session.user)
		const entryCode = await prisma.entryCode.findFirst({
			where: {
				code,
        eventId
			},
		})
		console.log("Entry code found:", entryCode)
		if (!entryCode) {
			return {status: "error", message: "Invalid Ticket"}
		}
		console.log("Entry code expires at:", entryCode.expiresAt)
		if (entryCode.expiresAt < new Date()) {
			return {status: "error", message: "Code expired"}
		}
		const ticket = await prisma.ticket.findUnique({
			where: {
				tokenId: entryCode.nftAddress,
			},
			include: {
				event: true,
			},
		})

    //TODO: Mark ticket used before returning
		return {status: "success", entryCode, ticket}
	} catch (error) {
		return {status: "error", message: "Internal server error"}
	}
}
