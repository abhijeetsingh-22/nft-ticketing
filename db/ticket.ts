// import prisma from "@/db";
import { createNftForEvent, transferNftToBuyer } from "@/lib/NFT/creatEventProject";
import { handleBuyTicket } from "@/lib/NFT/transferSol";
import { Event, Ticket } from "@prisma/client";
import { createTransferInstruction, getOrCreateAssociatedTokenAccount, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, Transaction } from "@solana/web3.js";


export async function buyEventTicket(event: Event, publicKey: PublicKey, connection: Connection, balance: number, signTransaction: any) {
  try {
    console.log("event", event);
    // check if the user has bought a token already for this event
    // then say only one token can be bought per event


    let NFT = await handleBuyTicket(event, publicKey, connection, balance, signTransaction);
    // console.log("NFT", NFT)
    //NFT.data.mintAddress

    console.log("here reached 101")


    let nftCreation = await createNftForEvent(event)
    if (nftCreation?.code !== 200) {
      alert(`createNftForEvent fail: ${nftCreation?.message}`)
      return
    }
    console.log("here reached 202", nftCreation)

    const transferResponse = await transferNftToBuyerUI(
      publicKey.toBase58(),
      nftCreation.data.mintAddress,
      connection
    );
    console.log("here reached 303", transferResponse)
    // const transaction = transferResponse?.data?.transaction
    // const senderWallet = transferResponse?.data?.senderWallet

    // const signature = await signTransaction(transaction, [senderWallet]);
    // await connection.confirmTransaction(signature, 'processed');

    console.log("here reached 404")


    //save mintAddress in db as tokenID(tokenMintAddress)
    // const events = await prisma.ticket.create({
    //   data: {
    //     name: "test",
    //     email: "test",
    //     eventId: "test",
    //   },
    // })
    return { type: 'success', code: 200, message: "Ticket bought successfully" };
  } catch (error) {
    console.error('Get events error:', error);
    return { type: 'error', resultCode: 'SERVER_ERROR', message: "Something went wrong" };
  }
}



export const transferNftToBuyerUI = async (buyerWalletAddress: string, nftMintAddress: string, connection: Connection) => {
  try {
    console.log("buyerWalletAddress", buyerWalletAddress, "nftMintAddress", nftMintAddress);

    const buyerWallet = new PublicKey(buyerWalletAddress);
    const mintAddress = new PublicKey(nftMintAddress);

    // Replace this with your actual private key
    const PRIVATE_KEY = Uint8Array.from([74, 220, 17, 215, 12, 148, 14, 11, 101, 91, 59, 0, 239, 164, 125, 58, 150, 6, 182, 129, 183, 156, 75, 40, 59, 68, 243, 103, 145, 209, 56, 36, 128, 219, 32, 149, 169, 202, 250, 47, 216, 171, 223, 1, 11, 197, 216, 232, 93, 186, 45, 131, 61, 14, 71, 166, 156, 156, 228, 38, 95, 36, 20, 37]);

    if (!PRIVATE_KEY) {
      throw new Error("PRIVATE_KEY is not set");
    }

    const senderWallet = Keypair.fromSecretKey(PRIVATE_KEY);

    if (!senderWallet) {
      throw new Error("senderWallet is not set");
    }

    // Ensure the buyer has an associated token account for the NFT
    const buyerTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      senderWallet,
      mintAddress,
      buyerWallet
    );
    console.log("buyerTokenAccount", buyerTokenAccount);

    // Ensure the sender has an associated token account for the NFT
    const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      senderWallet,
      mintAddress,
      senderWallet.publicKey
    );
    console.log("senderTokenAccount", senderTokenAccount);

    // Create the transaction to transfer the NFT
    const transaction = new Transaction().add(
      createTransferInstruction(
        senderTokenAccount.address, // Sender's token account (associated token account)
        buyerTokenAccount.address,  // Buyer's token account (associated token account)
        senderWallet.publicKey,     // Sender's public key (authority)
        1,                          // Amount (usually 1 for NFTs)
        [],
        TOKEN_PROGRAM_ID
      )
    );

    console.log("transaction created", transaction);

    // Fetch a recent blockhash and set it on the transaction
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = senderWallet.publicKey;

    // Sign the transaction with the sender's wallet
    transaction.sign(senderWallet);

    // Send the transaction
    const signature = await sendAndConfirmTransaction(connection, transaction, [senderWallet]);

    console.log("signature", signature);
    return { message: 'NFT transferred successfully', data: transaction, code: 200 };
  } catch (error) {
    console.error('Error transferring NFT to buyer:', error);
    return { message: 'Internal Server error: Function transferNftToBuyer.', data: null, code: 400 };
  }
};
