// import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
// import { keypairIdentity } from '@metaplex-foundation/umi'
// import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata'
// import { mplCandyMachine } from '@metaplex-foundation/mpl-candy-machine'

// // Create Umi Instance
// const umi = createUmi(process.env.RPC_ENDPOINT!)

// // Read the private key from .env
// const secretKey = JSON.parse(process.env.PRIVATE_KEY!)

// // Create a keypair from your private key
// const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secretKey))

// // Register it to the Umi client.
// umi.use(keypairIdentity(keypair))



import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { keypairIdentity } from '@metaplex-foundation/umi';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { mplCandyMachine, fetchCandyMachine, fetchCandyGuard } from '@metaplex-foundation/mpl-candy-machine';
import { publicKey } from '@metaplex-foundation/umi';

// Create Umi instance
const umi = createUmi(process.env.RPC_ENDPOINT!)
  .use(mplTokenMetadata())
  .use(mplCandyMachine());

// Read the private key from .env
const secretKey = JSON.parse(process.env.PRIVATE_KEY!);

// Create a keypair from your private key
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secretKey));

// Register the keypair to the Umi client
umi.use(keypairIdentity(keypair));

(async () => {
  try {
    // Specify your Candy Machine's public key
    const candyMachinePublicKey = publicKey('...'); // Replace with your actual Candy Machine public key

    // Fetch Candy Machine and Candy Guard data
    const candyMachine = await fetchCandyMachine(umi, candyMachinePublicKey);
    const candyGuard = await fetchCandyGuard(umi, candyMachine.mintAuthority);

    console.log('Candy Machine:', candyMachine);
    console.log('Candy Guard:', candyGuard);

    // Example: Mint an NFT (adjust as per your Candy Machine's requirements)
    // const { nft } = await mintFromCandyMachine(umi, candyMachinePublicKey, keypair.publicKey);
    // console.log(`Minted NFT: ${nft.address.toString()}`);
  } catch (error) {
    console.error('Error minting NFT:', error);
  }
})();
