const { Metaplex , keypairIdentity } = require("@metaplex-foundation/js");
const {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  Keypair,
} = require("@solana/web3.js");
const {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintToChecked,
  createTransferCheckedInstruction,
  TOKEN_PROGRAM_ID,
} = require("@solana/spl-token");

async function createAndTransferNFT() {
  const connection = new Connection("https://api.devnet.solana.com", "confirmed");
  const receiverPublicKey = new PublicKey("DTqgm1i8TKmpuiBx887ChkBe7FmcqC5UE6fUYhunsRrU");

  const payer = Keypair.fromSecretKey(Uint8Array.from([74,220,17,215,12,148,14,11,101,91,59,0,239,164,125,58,150,6,182,129,183,156,75,40,59,68,243,103,145,209,56,36,128,219,32,149,169,202,250,47,216,171,223,1,11,197,216,232,93,186,45,131,61,14,71,166,156,156,228,38,95,36,20,37]));
  
  const metaplex = new Metaplex(connection);
  metaplex.use(keypairIdentity(payer));

  const mintAuthority = payer;
  const freezeAuthority = payer;

//   let mintPubkey = await createMint(
//     connection,
//     payer,
//     mintAuthority.publicKey,
//     freezeAuthority.publicKey,
//     0
//   );
//   console.log("Mint Pubkey:", mintPubkey.toString());

  
//   const { nft } = await metaplex.nfts().create({
//     uri: "https://utfs.io/f/0cfb1290-8f29-4a70-bc17-6ef34a19b6ff-g8sk1d.png",
//     name: "100Xdevs",
//     symbol: "SYL",
//     sellerFeeBasisPoints: 500,
//     creators: [
//       {
//         address: mintAuthority.publicKey,
//         share: 100,
//       },
//     ],
//   });

//   console.log("nft", nft.token.mintAddress.toString());
//   let nftMintAddress = nft.token.mintAddress.toString();
//   mintPubkey = await getnft();
  let mintPubkey = new PublicKey('4bMUvJ2zyqAJCzf2VzhHU9hXtTGoXZM348DVumAF5kKi');
  const mintAuthorityTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mintPubkey,
    mintAuthority.publicKey
  );
  console.log("Mint Authority Token Account:", mintAuthorityTokenAccount.address.toString());

  // Verify that the mint authority is correct
  const mintInfo = await connection.getParsedAccountInfo(mintPubkey);
  console.log("Mint Info:", mintInfo.value.data.parsed.info);

//   await mintToChecked(
//     connection,
//     payer,
//     mintPubkey,
//     mintAuthorityTokenAccount.address,
//     mintAuthority,
//     1,
//     0
//   );
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
}

createAndTransferNFT().catch(console.error);

// const basex = require('base-x')
// const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

// const { createUmi } = require("@metaplex-foundation/umi-bundle-defaults")
// const { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } = require("@metaplex-foundation/umi")
// const { createNft, mplTokenMetadata } = require("@metaplex-foundation/mpl-token-metadata")

// const getnft = async () => {
// const RPC_ENDPOINT = "https://api.devnet.solana.com";
// const umi = createUmi(RPC_ENDPOINT);

// let keypair = umi.eddsa.createKeypairFromSecretKey(Uint8Array.from([74,220,17,215,12,148,14,11,101,91,59,0,239,164,125,58,150,6,182,129,183,156,75,40,59,68,243,103,145,209,56,36,128,219,32,149,169,202,250,47,216,171,223,1,11,197,216,232,93,186,45,131,61,14,71,166,156,156,228,38,95,36,20,37]));
// const myKeypairSigner = createSignerFromKeypair(umi, keypair);
// umi.use(signerIdentity(myKeypairSigner));
// umi.use(mplTokenMetadata())

// const mint = generateSigner(umi);
// // Create the Collection NFT.
// const collectionUpdateAuthority = generateSigner(umi);


//     let tx = createNft(umi, {
//         mint: mint,
//         authority: collectionUpdateAuthority,
//         name: "Harry Potter NFT using umi",
//         symbol: "Harry",
//         uri: "",
//         sellerFeeBasisPoints: percentAmount(9.99, 2), 
//         isCollection: true,
//     })
//     let result = await tx.sendAndConfirm(umi);
//     const signature = basex(ALPHABET).encode(result.signature);

//     console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)

//     console.log("Mint Address: ", mint.publicKey);
//     return mint.publicKey;
// }
