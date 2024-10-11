import { Program, AnchorProvider, web3, BN } from "@project-serum/anchor";
import { NftEventPlatform } from "../types/nft_event_platform"; // Import IDL
import NFT_EVENT_CONTRACT_IDL from "../idl/nft_event_platform.json";
import {
  connection,
  commitmentLevel,
  minttixprogramId,
  minttixprogramInterface,
} from "../../../utils/constants";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { Idl } from '@project-serum/anchor';

// const NFT_EVENT_PLATFORM_IDL: Idl = {
//   version: '1.0.0',
//   name: NFT_EVENT_CONTRACT_IDL.metadata.name,
//   metadata: NFT_EVENT_CONTRACT_IDL.metadata,
// //   instructions: {
// //     name : NFT_EVENT_CONTRACT_IDL.metadata.name,
// //     accounts: [],
// //     args: [],
// //   },
// //   accounts: [
// //     ...
// //   ]
// };
export default async function createEvent(
  eventName: string,   // Event name
  eventUri: string,     // URI for event
  ticketPrice: number,  // Ticket price in lamports
  maxTickets: number,   // Max tickets for the event
  wallet: AnchorWallet,
  collectionAccount: web3.Keypair
) {
  // Create AnchorProvider
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: commitmentLevel,
  });

  if (!provider) return;

  // Program interface with IDL, Program ID, and provider
  const program = new Program(
    minttixprogramInterface,
    minttixprogramId,
    provider
  ) as Program<Idl>;

  // Convert inputs into BN (since Anchor expects BN for u64)
  const ticketPriceBN = new BN(ticketPrice);
  const maxTicketsBN = new BN(maxTickets);

  try {
    // Create the collection (event) on-chain using the Solana program
    const txn = await program.rpc.createCollection(
      eventName,           // Event name
      eventUri,            // Event URI
      ticketPriceBN,       // Ticket price in BN
      maxTicketsBN,        // Max tickets in BN
      {
        accounts: {
          collection: collectionAccount.publicKey, // Public key for the collection
          signer: provider.wallet.publicKey,       // Organizer's wallet
          payer: provider.wallet.publicKey,        // Wallet paying for the transaction
          systemProgram: SystemProgram.programId,  // Solana system program
          mplCoreProgram: new PublicKey("CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d"), // Metaplex Core Program ID
        },
        signers: [collectionAccount],  // Sign with the collection account
      }
    );

    // Fetch and return the newly created collection
    const collection = await program.account.myBaseCollectionV1.fetch(
      collectionAccount.publicKey
    );

    console.log("Collection created:", collection);
    return collection;
  } catch (err) {
    console.error("Transaction error: ", err);
    return;
  }
}
