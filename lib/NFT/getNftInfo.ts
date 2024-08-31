import { Connection, PublicKey } from '@solana/web3.js';
import { Metaplex, Nft } from '@metaplex-foundation/js';

interface Creator {
    address: string;
    verified: boolean;
    share: number;
}

export interface NftDetails {
    mintAddress: string;
    owner: string;
    updateAuthority: string;
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    creators: Creator[];
}

export const getNftDetails = async (nftAddress: string): Promise<NftDetails> => {
    // Define the Solana devnet cluster connection
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

    // Initialize Metaplex
    const metaplex = Metaplex.make(connection);

    try {
        // Convert the provided NFT address to a PublicKey
        const nftPublicKey = new PublicKey(nftAddress);

        // Fetch the NFT metadata
        const nft = await metaplex.nfts().findByMint({ mintAddress: nftPublicKey }) as Nft;

        // Extract the relevant details
        const nftDetails: NftDetails = {
            mintAddress: nft.mint.address.toString(),
            owner: nft.updateAuthorityAddress.toString(),
            updateAuthority: nft.updateAuthorityAddress.toString(),
            name: nft.name,
            symbol: nft.symbol,
            uri: nft.uri,
            sellerFeeBasisPoints: nft.sellerFeeBasisPoints,
            creators: nft.creators.map(creator => ({
                address: creator.address.toString(),
                verified: creator.verified,
                share: creator.share,
            })),
        };

        // Fetch and log metadata from URI if needed
        const response = await fetch(nft.uri);
        // const metadata = await response.json();

        // Combine on-chain and off-chain metadata
        return {
            ...nftDetails,
            // metadata
        };
    } catch (error) {
        console.error('Error fetching NFT details:', error);
        throw error;
    }
}
