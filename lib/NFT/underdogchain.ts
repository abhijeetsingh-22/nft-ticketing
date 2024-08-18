const axios = require('axios');
const solanaweb3 = require('@solana/web3.js');

const underdogApiEndpoint = "https://dev.underdogprotocol.com";
const chainStackAPI = "https://nd-875-212-309.p2pify.com/9288f69c33dcdf0f8aa0f639985a488d";
const connection = new solanaweb3.Connection(chainStackAPI);

const config = {
    headers: { Authorization: `Bearer ${process.env.UNDERDOG_API_KEY || '82e48591d8cc52.6eaeb7157da14925b0c4dbfb4edf4736'}` }
}

const projectData = {
    "name": "Solana Underdog Summit 2024",
    "symbol": "UDB",
    "image": "https://media.licdn.com/dms/image/v2/D4D03AQHQwwjNsT6iYA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1688143688904?e=1729728000&v=beta&t=pmKcI95Zre69PSWbgfzDKgiVK-4g0PoeumcvSpxiryc",
}

const nftData = {
    "name": "Solana Underdog Summit 2024 001",
    "symbol": "UDB",
    "image": "https://imgs.search.brave.com/W6Dh9SpfVkItRcnislYIaP6JWuBNkarWBDopoXCIQXg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kMzRq/bHhwd3JqYTdxOS5j/bG91ZGZyb250Lm5l/dC93cC1jb250ZW50/L3VwbG9hZHMvMjAy/MS8xMi9ORlQtRXZl/bnRzLTEuanBn",
}

const mintNFT = async () => {
    try {
        const createProjectResponse = await axios.post(
            `${underdogApiEndpoint}/v2/projects`,
            projectData,
            config
        );

        let projectAccountInfo = null;
        let retries = 0;

        // Polling loop to wait for project account information
        while (!projectAccountInfo && retries < 50) {
            projectAccountInfo = await connection.getAccountInfo(
                new solanaweb3.PublicKey(createProjectResponse.data.mintAddress)
            );
            await new Promise(resolve => setTimeout(resolve, 100));
            retries++;
        }

        if (!projectAccountInfo) {
            throw new Error("Project account information could not be retrieved");
        }

        const createNftResponse = await axios.post(
            `${underdogApiEndpoint}/v2/projects/${createProjectResponse.data.projectId}/nfts`,
            nftData,
            config
        );

        let retrieveNFT = null;
        retries = 0;

        // Polling loop to wait for NFT retrieval
        do {
            retrieveNFT = await axios.get(
                `${underdogApiEndpoint}/v2/projects/${createProjectResponse.data.projectId}/nfts/${createNftResponse.data.nftId}`,
                config
            );
            await new Promise(resolve => setTimeout(resolve, 100));
            retries++;
        } while ((!retrieveNFT.data || retrieveNFT.data.status !== 'confirmed') && retries < 50);

        if (!retrieveNFT.data || retrieveNFT.data.status !== 'confirmed') {
            throw new Error("NFT could not be confirmed");
        }

        console.log(`Mint address: ${retrieveNFT.data.mintAddress}`);
        console.log(`Name: ${retrieveNFT.data.name}`);
        console.log(`Image: ${retrieveNFT.data.image}`);

        const signatures = await connection.getSignaturesForAddress(
            new solanaweb3.PublicKey(createProjectResponse.data.mintAddress),
            { commitment: 'confirmed' }
        );

        if (signatures.length > 0) {
            const transactionDetails = await connection.getParsedTransaction(
                signatures[0].signature,
                {
                    commitment: 'confirmed',
                    encoding: "jsonParsed",
                    maxSupportedTransactionVersion: 0,
                }
            );

            console.log(transactionDetails);
        } else {
            console.log("No signatures found for the mint address");
        }
    } catch (error) {
        console.log("An error occurred:", error);
    }
}

mintNFT();
