import idl from "../app/api/idl/nft_event_platform.json";
import { NftEventPlatform } from "../app/api/types/nft_event_platform";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";


/* Constants for RPC Connection the Solana Blockchain */
export const commitmentLevel = "processed";
export const endpoint =
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl("devnet");
export const connection = new Connection(endpoint, commitmentLevel);


/* Constants for the Deployed "Hello World" Program */
export const minttixprogramId = new PublicKey(idl.address);
export const minttixprogramInterface = JSON.parse(JSON.stringify(idl));
