import { Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL, Connection } from '@solana/web3.js';
import { Event } from "@prisma/client";
import { convertUsdToSol } from './dollarToSol';
import { toast } from 'sonner';



export const handleBuyTicket = async (event: Event, publicKey: PublicKey, connection: Connection, balance: number, signTransaction: any, NFTSolReciver: PublicKey) => {
    try {
        console.log("balance", balance);


        if (!publicKey) {
            console.error("No wallet connected");
            return;
        }

        const buyerWalletAddress = publicKey.toBase58();
        console.log("buyerWalletAddress", buyerWalletAddress);

        // TODO : fetch from event price and change to sol
        let ticketPrice = await convertUsdToSol(Number(event.ticketPrice));

        if (!ticketPrice) {
            throw new Error("Error while converting usd to sol");
        }
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: NFTSolReciver,
                lamports: (ticketPrice + 0.00002) * LAMPORTS_PER_SOL,
            })
        );
        console.log("transaction", transaction)



        // Fetch a recent blockhash and set it on the transaction
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        transaction.feePayer = publicKey;

        // Sign the transaction
        const signedTransaction = await signTransaction(transaction);

        // Send the transaction
        const signature = await connection.sendRawTransaction(signedTransaction.serialize());
        console.log("Transaction signature:", signature);

        // Confirm the transaction
        await connection.confirmTransaction(signature, 'processed');
        console.log("Transaction confirmed:", signature);

        if (!signature) {
            throw new Error("No signature found: Error while payment");
        }

        return { type: 'success', code: 200, message: "Payment recived from buyer" };
    } catch (error) {
        console.error("Transaction failed:", error);
        toast.error("Transaction failed. Please try again.");
        return { type: 'error', code: 500, message: "Transaction failed. Please try again." };
    }
};
