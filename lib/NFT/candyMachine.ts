import { generateSigner, none, percentAmount, some } from '@metaplex-foundation/umi'
import { createNft } from '@metaplex-foundation/mpl-token-metadata'

// Create the Collection NFT.
const collectionUpdateAuthority = generateSigner(umi)
const collectionMint = generateSigner(umi)
await createNft(umi, {
  mint: collectionMint,
  authority: collectionUpdateAuthority,
  name: 'My Collection NFT',
  uri: 'https://example.com/path/to/some/json/metadata.json',
  sellerFeeBasisPoints: percentAmount(9.99, 2), // 9.99%
  isCollection: true,
}).sendAndConfirm(umi)

// Pass the collection address and its authority in the settings.
const candyMachineSettings = {
  collectionMint: collectionMint.publicKey,
  collectionUpdateAuthority,
  itemsAvailable: 500,
  hiddenSettings: none(), // hidden gives option to set metadata at the time of mint
  // config line settings can be set at the time of mint collection and mint individual NFT with common data this saves rent for metadata
  configLineSettings: some({
    prefixName: 'My NFT Project #$ID+1$', // $ID+1$
    nameLength: 0,
    prefixUri: 'https://arweave.net/', // https://arweave.net/ + then further
    uriLength: 43, // length of string further added to the arweave URL
    isSequential: false,
  }),
}
