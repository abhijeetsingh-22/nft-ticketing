import { Keypair, Connection, Transaction, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, getOrCreateAssociatedTokenAccount, createTransferInstruction } from "@solana/spl-token";

function values(mint_address:string) {
    // Retrieve the private key from environment variables
    console.log("private key", process.env.PRIVATE_KEY);
    const privateKey = [74,220,17,215,12,148,14,11,101,91,59,0,239,164,125,58,150,6,182,129,183,156,75,40,59,68,243,103,145,209,56,36,128,219,32,149,169,202,250,47,216,171,223,1,11,197,216,232,93,186,45,131,61,14,71,166,156,156,228,38,95,36,20,37];
    if (!privateKey) throw new Error("Missing private key");

    // Convert the private key string into a Uint8Array
    const privateKeyArray = Uint8Array.from(privateKey);

    // Create a Keypair from the private key
    const senderWallet = Keypair.fromSecretKey(privateKeyArray);

    // Connection to the Solana network
    const connection = new Connection("https://api.devnet.solana.com");

    // Destination wallet address
    const receiverWallet = new PublicKey("DTqgm1i8TKmpuiBx887ChkBe7FmcqC5UE6fUYhunsRrU"); // Replace with the receiver's wallet address

    // NFT mint address
    const mintAddress = new PublicKey(mint_address); // Replace with your NFT mint address

    return { senderWallet, connection, receiverWallet, mintAddress };
}

export const transferNft = async (mint_address:string) => {
    try {
        const { senderWallet, connection, receiverWallet, mintAddress } = values(mint_address);
        console.log("sda", senderWallet, connection, receiverWallet, mintAddress)
        // Get the sender's token account for the NFT
        const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            senderWallet,
            mintAddress,
            senderWallet.publicKey
        );
        console.log("sdada")
        // Get the receiver's token account for the NFT
        const receiverTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            senderWallet,
            mintAddress,
            receiverWallet
        );
        console.log("sda-------da")

        // Create a transaction for the transfer
        const transaction = new Transaction().add(
            createTransferInstruction(
                senderTokenAccount.address,
                receiverTokenAccount.address,
                senderWallet.publicKey,
                1, // Assuming transferring 1 NFT
                [],
                TOKEN_PROGRAM_ID
            )
        );

        // Sign and send the transaction
        const signature = await connection.sendTransaction(transaction, [senderWallet]);
        await connection.confirmTransaction(signature);

        console.log(`NFT transferred successfully. Transaction signature: ${signature}`);
    } catch (error) {
        console.error("Failed to transfer NFT:", error);
    }
}

// transferNft("8kNWCr6jLSKJ684H9JZsaficgJDxP8vkMi2mtg87Fova");

