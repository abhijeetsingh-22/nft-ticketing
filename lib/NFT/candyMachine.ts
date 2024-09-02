import { createUmi, generateSigner, percentAmount } from '@metaplex-foundation/umi';
import { createNft, TokenStandard } from '@metaplex-foundation/mpl-token-metadata';
import { create, fetchCandyMachine, fetchCandyGuard, deleteCandyMachine, deleteCandyGuard, mintV2 } from '@metaplex-foundation/mpl-candy-machine';
import { setComputeUnitLimit } from '@metaplex-foundation/mpl-toolbox';
import { transactionBuilder } from '@metaplex-foundation/umi';
import { PublicKey } from '@solana/web3.js';

// Initialize UMI
const umi = createUmi()


const createCandyMachineOnEventCreation = async (userPaymentAmount: number) => {
  try {
    const collectionMint = generateSigner(umi);
    await createNft(umi, {
      mint: collectionMint,
      authority: umi.identity,
      name: 'My Collection NFT',
      uri: 'https://example.com/path/to/some/json/metadata.json',
      sellerFeeBasisPoints: percentAmount(9.99, 2), // 9.99%
      isCollection: true,
    }).sendAndConfirm(umi);

    // Create Candy Machine
    const candyMachine = generateSigner(umi);
    let candyMachineAddress = await create(umi, {
      candyMachine,
      collectionMint: collectionMint.publicKey,
      collectionUpdateAuthority: umi.identity,
      tokenStandard: TokenStandard.NonFungible,
      sellerFeeBasisPoints: percentAmount(9.99, 2), // 9.99%
      itemsAvailable: 5000,
      creators: [
        {
          address: umi.identity.publicKey,
          verified: true,
          percentageShare: 100,
        },
      ],
      configLineSettings: {
        prefixName: '',
        nameLength: 32,
        prefixUri: '',
        uriLength: 200,
        isSequential: false,
      },
    })
    // .sendAndConfirm(umi);
    console.log(`Candy Machine Address: ${candyMachineAddress}`);

    return {
      candyMachine,
      collectionMint,
    
    }

  } catch (error) {
    console.error('Error creating Candy Machine:', error);
  }
  return null
}




// Handle Payment Request
const requestPayment = async (amount: number) => {
  // Implement payment request logic here
  // This could be a payment gateway integration or wallet interaction
  // Example: await paymentGateway.request({ amount });
};

// Mint NFT
const mintNft = async (userPaymentAmount: number, candyMachine: any, collectionMint: any) => {
  // Request payment before minting
  await requestPayment(userPaymentAmount);

  // Prepare NFT minting
  const nftMint = generateSigner(umi);
  const transaction = transactionBuilder()
    .add(setComputeUnitLimit(umi, { units: 800_000 }))
    .add(
      mintV2(umi, {
        candyMachine: candyMachine.publicKey,
        nftMint,
        collectionMint: collectionMint.publicKey,
        collectionUpdateAuthority: collectionMint.metadata.updateAuthority,
        tokenStandard: TokenStandard.NonFungible,
      })
    );

  await transaction.sendAndConfirm(umi);
};


// Fetch Candy Machine Details
// const fetchMachineDetails = async (address) => {
//   const candyMachine = await fetchCandyMachine(umi, address);
//   const candyGuard = await fetchCandyGuard(umi, candyMachine.mintAuthority);

//   console.log(candyMachine.publicKey); // The public key of the Candy Machine account.
//   console.log(candyMachine.mintAuthority); // The mint authority of the Candy Machine.
//   console.log(candyMachine.data.itemsAvailable); // Total number of NFTs available.
//   console.log(candyMachine.itemsRedeemed); // Number of NFTs minted.
//   console.log(candyMachine.items[0].index); // The index of the first loaded item.
//   console.log(candyMachine.items[0].name); // The name of the first loaded item (with prefix).
//   console.log(candyMachine.items[0].uri); // The URI of the first loaded item (with prefix).
//   console.log(candyMachine.items[0].minted); // Whether the first item has been minted.
// };

// Delete Candy Machine and Candy Guard
const deleteMachineAndGuard = async (candyMachineAddress: any) => {
  const candyMachine = await fetchCandyMachine(umi, candyMachineAddress);
  const candyGuard = await fetchCandyGuard(umi, candyMachine.mintAuthority);

  await deleteCandyMachine(umi, {
    candyMachine: candyMachine.publicKey,
  }).sendAndConfirm(umi);

  await deleteCandyGuard(umi, {
    candyGuard: candyMachine.mintAuthority,
  }).sendAndConfirm(umi);
};

async function main() {
  const userPaymentAmount = 1;

  const response = await createCandyMachineOnEventCreation(userPaymentAmount);
  if(!response) {
    return
  }

  const { candyMachine, collectionMint } = response

  await mintNft(userPaymentAmount, candyMachine, collectionMint)
  
  // Example usage for deleting after event
  const eventEndDate = new Date('2024-12-31T23:59:59Z'); // Set your event end date here
  const now = new Date();
  if (now >= eventEndDate) {
    await deleteMachineAndGuard(candyMachine);
  }
}

