// import prisma from "@/db";
import { createNftForEvent, transferNftToBuyer } from "@/lib/NFT/creatEventProject";
import { handleBuyTicket } from "@/lib/NFT/transferSol";
import { Event, Ticket } from "@prisma/client";
import { createMint, createTransferInstruction, getOrCreateAssociatedTokenAccount, mintTo, TOKEN_PROGRAM_ID, transfer } from "@solana/spl-token";
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, Transaction } from "@solana/web3.js";


export async function buyEventTicket(event: Event, publicKey: PublicKey, connection: Connection, balance: number, signTransaction: any) {
  try {
    console.log("event", event);
    // check if the user has bought a token already for this event
    // then say only one token can be bought per event
    let nftCreation = await createNftForEvent(event)
    if (nftCreation?.code !== 200) {
      alert(`createNftForEvent fail: ${nftCreation?.message}`)
      return
    }
    console.log("here reached 202", nftCreation)

    let solRecivedForEventTicket = await handleBuyTicket(event, publicKey, connection, balance, signTransaction);
    console.log("solRecivedForEventTicket", solRecivedForEventTicket)
    //NFT.data.mintAddress

    console.log("here reached 101")


    

    const transferResponse = await transferNftToBuyerUI(
      publicKey.toBase58(),
      nftCreation.data.mintAddress,
      connection
    );
    console.log("here reached 303", transferResponse)

    console.log("here reached 404")

    return { type: 'success', code: 200, message: "Ticket bought successfully" };
  } catch (error) {
    console.error('Get events error:', error);
    return { type: 'error', resultCode: 'SERVER_ERROR', message: "Something went wrong" };
  }
}



export const transferNftToBuyerUI = async (buyerWalletAddress: string, nftMintAddress: string, connection: Connection) => {
  try {
    console.log("buyerWalletAddress", buyerWalletAddress, "nftMintAddress", nftMintAddress);

    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    const receiverPublicKey = new PublicKey(buyerWalletAddress);
    let mintPubkey = new PublicKey(nftMintAddress);

    const payer = Keypair.fromSecretKey(Uint8Array.from([74, 220, 17, 215, 12, 148, 14, 11, 101, 91, 59, 0, 239, 164, 125, 58, 150, 6, 182, 129, 183, 156, 75, 40, 59, 68, 243, 103, 145, 209, 56, 36, 128, 219, 32, 149, 169, 202, 250, 47, 216, 171, 223, 1, 11, 197, 216, 232, 93, 186, 45, 131, 61, 14, 71, 166, 156, 156, 228, 38, 95, 36, 20, 37]));

    const metaplex = new Metaplex(connection);
    metaplex.use(keypairIdentity(payer));

    const mintAuthority = payer;
    const freezeAuthority = payer;

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

