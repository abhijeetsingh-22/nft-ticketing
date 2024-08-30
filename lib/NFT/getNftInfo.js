import { Connection, PublicKey } from '@solana/web3.js'
import { Metaplex } from '@metaplex-foundation/js'

async function getNftDetails(nftAddress) {
    // Define the Solana mainnet cluster connection
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

    // Initialize Metaplex
    const metaplex = Metaplex.make(connection);

    try {
        // Convert the provided NFT address to a PublicKey
        const nftPublicKey = new PublicKey(nftAddress);

        // Fetch the NFT metadata
        const nft = await metaplex.nfts().findByMint({ mintAddress: nftPublicKey });


        // Extract the relevant details
        const nftDetails = {
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
                share: creator.share
            }))
        };
        
        // console.log(nftDetails);
        

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

// Example usage
getNftDetails('5fGobnj9dztAJS3RqCfZb7ThqiStbbg7fmTmq4GWxaKk')
    .then(details => console.log(details))
    .catch(error => console.error(error));
