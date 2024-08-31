import { handleBuyTicket } from "@/lib/NFT/transferSol";
import { Event } from "@prisma/client";
import { createTransferCheckedInstruction, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, Transaction } from "@solana/web3.js";
import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import prisma from "@/db";


async function buyEventTicket(event: Event, publicKey: PublicKey, connection: Connection, balance: number, signTransaction: any) {
  try {
    const PRIVATE_KEY = process.env.PRIVATE_KEY
    if (!PRIVATE_KEY) {
      console.error("Unable to fecth private key from env");
    }


    const payer = Keypair.fromSecretKey(
      Uint8Array.from(
        [249, 36, 213, 4, 96, 14, 193, 194, 70, 70, 228, 62, 207, 254, 213, 147, 2, 130, 42, 63, 179, 72, 39, 205, 221, 44, 43, 160, 184, 117, 27, 34, 171, 186, 186, 101, 228, 244, 7, 21, 10, 196, 228, 132, 6, 246, 63, 36, 70, 133, 104, 40, 47, 81, 12, 185, 101, 163, 236, 136, 32, 38, 70, 206]))

    const mintAuthority = payer;
    const NFTSolReciver = payer.publicKey
    let solRecivedForEventTicket = await handleBuyTicket(event, publicKey, connection, balance, signTransaction, NFTSolReciver);
    console.log("solRecivedForEventTicket", solRecivedForEventTicket)

    if (solRecivedForEventTicket?.code !== 200) {
      return { type: 'error', code: 'PaymentError', message: "Payment Failed" };
    }


    // -------------- MINT NFT ----------------

    const metaplex = new Metaplex(connection);
    metaplex.use(keypairIdentity(payer));

    const { nft } = await metaplex.nfts().create({
      uri: event.thumbnail,
      name: event.name,
      symbol: event.nftSymbol ?? "SYM",
      sellerFeeBasisPoints: 500,
      creators: [
        {
          address: mintAuthority.publicKey,
          share: 100,
        },
      ],
    });

    //@ts-ignore
    let nftMintAddress = nft.token.mintAddress


    const transferResponse = await transferNftToBuyerUI(
      publicKey.toBase58(),
      nftMintAddress,
      connection,
      payer
    );

    console.log("transferResponse", transferResponse)

    // --------------SAVE TICKET DATA ----------------
    // TODO: 101
    // let eventTicketData = {
    //   tokenId: nftMintAddress,
    //   ownerId: publicKey.toBase58(),
    //   eventId: event.id,
    //   price: event.ticketPrice,
    //   status: "SOLD",
    //   event: event,
    //   user: null
    // }


    // const ticket = await prisma.ticket.create({
    //   data: eventTicketData
    // });


    return { type: 'success', code: 200, message: "Ticket bought successfully" };
  } catch (error) {
    console.error('Get events error:', error);
    return { type: 'error', resultCode: 'SERVER_ERROR', message: "Something went wrong" };
  }
}



export const transferNftToBuyerUI = async (buyerWalletAddress: string, nftMintAddress: string, connection: Connection, payer: Keypair) => {
  try {
    console.log("buyerWalletAddress", buyerWalletAddress, "nftMintAddress", nftMintAddress);

    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    const receiverPublicKey = new PublicKey(buyerWalletAddress);
    let mintPubkey = new PublicKey(nftMintAddress);

    const metaplex = new Metaplex(connection);
    metaplex.use(keypairIdentity(payer));

    const mintAuthority = payer;

    const mintAuthorityTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mintPubkey,
      mintAuthority.publicKey
    );
    console.log("Mint Authority Token Account:", mintAuthorityTokenAccount.address.toString());

    // Verify that the mint authority is correct
    const mintInfo = await connection.getParsedAccountInfo(mintPubkey);
    console.log("Mint Info:", mintInfo?.value?.data);

    console.log("Minted 1 NFT to Mint Authority Token Account");

    const receiverTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mintPubkey,
      receiverPublicKey
    );
    console.log("Receiver Token Account:", receiverTokenAccount.address.toString());

    const transferTransaction = new Transaction().add(
      createTransferCheckedInstruction(
        mintAuthorityTokenAccount.address,
        mintPubkey,
        receiverTokenAccount.address,
        mintAuthority.publicKey,
        1,
        0
      )
    );

    const signature = await sendAndConfirmTransaction(connection, transferTransaction, [payer, mintAuthority]);
    console.log("Transfer Transaction Signature:", signature);
    return { message: 'NFT transferred successfully', data: signature, code: 200 };
  } catch (error) {
    console.error('Error transferring NFT to buyer:', error);
    return { message: 'Internal Server error: Function transferNftToBuyer.', data: null, code: 400 };
  }
};

export const getTicketsByUserId = async (userId: string) => {
  try {
    const tickets = await prisma.ticket.findMany({
      where: {
        userId: userId
      },
      include: {
        event: true,
        order: true,
        user: true
      }
    });

    return { tickets, message: 'Tickets retrieved successfully', code: 200 };
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return { tickets: [], message: 'Error fetching tickets', code: 500 };
  }
};
