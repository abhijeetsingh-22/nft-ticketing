import { ShdwDrive } from "@shadow-drive/sdk";
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
import fs from "fs";
import path from "path";


function loadKeypair(filename: string): Keypair {
    const secret = JSON.parse(fs.readFileSync(filename).toString()) as number[];
    const secretKeypair = Keypair.fromSecretKey(new Uint8Array(secret));
    return secretKeypair;
}
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const wallet = new anchor.Wallet("./mtixmS62V1FNyDwX4DCRsTbn8Ew7NkvaxbsK2JA7maB.json");


const createAccount = async () => {
    const drive = await new ShdwDrive(connection, wallet).init();
    const resp = await drive.createStoraegAccount("Event1", "300mb", "v2")
    console.log(resp.transaction_signature)
    console.log(resp.shdw_bucket)
    
    return resp;
};

const bucket = createAccount();