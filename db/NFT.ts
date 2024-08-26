import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Metaplex, keypairIdentity, bundlrStorage } from "@metaplex-foundation/js";
import { getOrCreateAssociatedTokenAccount, mintTo, transfer } from "@solana/spl-token";

const metadata = {
    name: "The Gradient Pearl",
    symbol: "SHIP",
    description: "The Gradient Pearl is a legendary Pirate ship that sails the Seven Seas. Captain Rajovenko leads with a drink can in his hand.",
    image: "https://bafybeic75qqhfytc6xxoze2lo5af2lfhmo2kh4mhirelni2wota633dgqu.ipfs.nftstorage.link/",
};

export const mintNFT = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

        // Replace this with your actual wallet details
        const senderPrivateKey = Uint8Array.from([
            74, 220, 17, 215, 12, 148, 14, 11, 101, 91, 59, 0, 239, 164, 125, 58, 150, 6, 182, 129,
            183, 156, 75, 40, 59, 68, 243, 103, 145, 209, 56, 36, 128, 219, 32, 149, 169, 202, 250,
            47, 216, 171, 223, 1, 11, 197, 216, 232, 93, 186, 45, 131, 61, 14, 71, 166, 156, 156, 228,
            38, 95, 36, 20, 37,
        ]);
        const payer = Keypair.fromSecretKey(senderPrivateKey);
        console.log("1")

        const metaplex = Metaplex.make(connection)
        .use(keypairIdentity(payer))
        .use(bundlrStorage({
          address: "https://devnet.bundlr.network",
          providerUrl: clusterApiUrl('devnet'),
          timeout: 60000,
        }));
        console.log("2")


        // Initialize Metaplex with the payer's identity
        const { uri } = await metaplex.nfts().uploadMetadata(metadata);

        console.log("Metadata uploaded:", uri);
        console.log("11")

        // Create a new NFT using the uploaded metadata
        const { nft, response } = await metaplex.nfts().create({
            uri,
            name: metadata.name,
            symbol: metadata.symbol,
            sellerFeeBasisPoints: 500, // Represents 5.00%.
            isMutable: true,
        });

        console.log("NFT created:", nft);
        console.log("Transaction signature:", response.signature);

        // Return the NFT mint address or any other details you need
        // return nft;

        // console.log("buyerWalletAddress", buyerWalletAddress, "nftMintAddress", nftMintAddress);

        const buyerWallet = new PublicKey("DTqgm1i8TKmpuiBx887ChkBe7FmcqC5UE6fUYhunsRrU");
        // let mintAddress = nft
        let mintAddress = new PublicKey("D9nKpqa4aZ4AsvoMjFUsF7zavGM7FNyNxK4UqB25FmEg");
        // let collectionMintAddress = new PublicKey("DSXtyXvQGTeTSoukzY8zEMz8yB4GM3WHqS2ivtPeXTJV");
        // Replace this with your actual private key
        const PRIVATE_KEY = Uint8Array.from([74, 220, 17, 215, 12, 148, 14, 11, 101, 91, 59, 0, 239, 164, 125, 58, 150, 6, 182, 129, 183, 156, 75, 40, 59, 68, 243, 103, 145, 209, 56, 36, 128, 219, 32, 149, 169, 202, 250, 47, 216, 171, 223, 1, 11, 197, 216, 232, 93, 186, 45, 131, 61, 14, 71, 166, 156, 156, 228, 38, 95, 36, 20, 37]);

        if (!PRIVATE_KEY) {
            throw new Error("PRIVATE_KEY is not set");
        }

        const senderWallet = Keypair.fromSecretKey(PRIVATE_KEY);

        if (!senderWallet) {
            throw new Error("senderWallet is not set");
        }
        //     let mint = await createMint(connection, senderWallet, senderWallet.publicKey, null, 0);
        // console.log("mint", mint)
        // mintAddress = mint
        // Ensure the sender has an associated token account for the NFT
        const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            senderWallet,
            mintAddress,
            senderWallet.publicKey
        );
        console.log("senderTokenAccount", senderTokenAccount);

        // Ensure the buyer has an associated token account for the NFT
        const buyerTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            senderWallet,  // The payer of the transaction fees (usually the sender)
            mintAddress,
            buyerWallet
        );
        console.log("buyerTokenAccount", buyerTokenAccount);

        // Create the transaction to transfer the NFT
        // const transaction = new Transaction().add(
        //   createTransferInstruction(
        //     senderTokenAccount.address, // Sender's token account (associated token account)
        //     buyerTokenAccount.address,  // Buyer's token account (associated token account)
        //     senderWallet.publicKey,     // Sender's public key (authority)
        //     1,                          // Amount (usually 1 for NFTs)
        //     [],
        //     TOKEN_PROGRAM_ID
        //   )
        // );

        // console.log("transaction created", transaction);

        // // Fetch a recent blockhash and set it on the transaction
        // const { blockhash } = await connection.getLatestBlockhash();
        // transaction.recentBlockhash = blockhash;
        // transaction.feePayer = senderWallet.publicKey;

        // // Sign the transaction with the sender's wallet
        // transaction.sign(senderWallet);

        // // Send the transaction
        // const signature = await sendAndConfirmTransaction(connection, transaction, [senderWallet]);

        // console.log("signature", signature);


        // Mint 1 new token to the "fromTokenAccount" account we just created
        let signature = await mintTo(
            connection,
            senderWallet,
            mintAddress,
            senderTokenAccount.address,
            senderWallet.publicKey,
            1000000000,
            [],
        );
        console.log('mint tx:', signature);
        // Transfer the new token to the "toTokenAccount" we just created
        signature = await transfer(
            connection,
            senderWallet,
            senderTokenAccount.address,
            buyerTokenAccount.address,
            senderWallet.publicKey,
            1000000000,
            [],
        );
        console.log('transfer tx:', signature);
        return { message: 'NFT transferred successfully', data: signature, code: 200 };
    } catch (error) {
        console.error("An error occurred:", error);
    }

}