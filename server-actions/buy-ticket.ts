"use server"

import prisma from "@/db"
import {getEventById} from "@/db/events"
import {keypairIdentity, Metaplex} from "@metaplex-foundation/js"
import {Connection, Cluster, clusterApiUrl, Keypair, Transaction} from "@solana/web3.js"
import bs58 from "bs58"

type BuyEventTicketParams = {
	eventId: string
	signedTransaction: any
}

export const buyEventTicket = async ({eventId, signedTransaction}: BuyEventTicketParams) => {
	try {
		const event = await prisma.event.findUnique({
			where: {id: eventId},
		})
		if (!event) {
			return {type: "error", resultCode: "EVENT_NOT_FOUND"}
		}

		const connection = new Connection(clusterApiUrl("devnet"))
		const PLATFORM_WALLET_PRIVATE_KEY = process.env.PLATFORM_WALLET_PRIVATE_KEY
		if (!PLATFORM_WALLET_PRIVATE_KEY) {
			console.error("Unable to fecth PLATFORM_WALLET_PRIVATE_KEY from env")
			return {type: "error", resultCode: "SERVER_ERROR", message: "Something went wrong"}
		}
		const platformWallet = Keypair.fromSecretKey(bs58.decode(PLATFORM_WALLET_PRIVATE_KEY))
		const transaction = Transaction.from(Buffer.from(signedTransaction, "base64"))

		// Send the transaction to the network
		const signature = await connection.sendRawTransaction(transaction.serialize(), {
			skipPreflight: false,
			preflightCommitment: "confirmed",
		})
		// Confirm the transaction
		const res = await connection.confirmTransaction(signature, "confirmed")
		console.log("Transaction confirmed:", res)
		// Extract the user's public key from the transaction
  
		const userWallet = transaction.signatures[0].publicKey

    console.log("userWallet", userWallet)

		const metaplex = new Metaplex(connection)
		metaplex.use(keypairIdentity(platformWallet))

		const {nft} = await metaplex.nfts().create({
			uri: event.thumbnail,
			name: event.name,
			symbol: event.nftSymbol ?? "SYM",
			sellerFeeBasisPoints: 500,
			creators: [
				{
					address: platformWallet.publicKey,
					share: 100,
				},
			],
      tokenOwner: userWallet,
		})

    console.log("NEW NFT", nft)

    const nftMintAddress = nft.token.mintAddress
    return {type: "success", code: 200, message: "Ticket bought successfully"}
	} catch (error) {
		console.error("Get events error:", error)
		return {type: "error", resultCode: "SERVER_ERROR", message: "Something went wrong"}
	}
}
