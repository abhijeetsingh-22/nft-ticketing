import axios from 'axios';
import solanaweb3 from '@solana/web3.js';

// TODO: put these in env
const underdogApiEndpoint = "https://dev.underdogprotocol.com";
const chainStackAPI = "https://nd-875-212-309.p2pify.com/9288f69c33dcdf0f8aa0f639985a488d";
const connection = new solanaweb3.Connection(chainStackAPI);

interface Event {
    name: string;
    date: string;
    location: string;
    image: string;
    description: string;
    organisationId: string;
}

interface NFTEvent {
    event: Event;
    symbol: string;
    projectId: string;
    mintAddress: string;
    buyerWalletAddress: string; // New field to hold the buyer's wallet address
}

export const createEventProject = async (event: Event, symbol: string) => {
    try {
        let resBody = null;
        if (!process.env.UNDERDOG_API_KEY) {
            throw new Error("UNDERDOG_API_KEY is not set");
        }
        const config = {
            headers: { Authorization: `Bearer ${process.env.UNDERDOG_API_KEY}` }
        }
        if (!event.name || !event.date || !event.location || !event.organisationId || !symbol) {
            console.log("Error in createEventProject:  Missing fields");
            return { message: 'Missing Fields', code: 400 };
        }

        const projectData = {
            "name": event.name,
            "symbol": symbol,
            "image": event.image,
        }

        const createProjectResponse = await axios.post(
            `${underdogApiEndpoint}/v2/projects`,
            projectData,
            config
        );

        if (createProjectResponse.data.mintAddress) {
            resBody = {
                mintAdress: createProjectResponse.data.mintAddress,
                projectId: createProjectResponse.data.projectId
            }
            console.log('Project created successfully:', createProjectResponse.data);
        } else {
            return { message: 'Error in createEventProject while creating project', data: null, code: 400 };
        }

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

        return { message: 'Event created successfully', data: resBody, code: 200 };

    } catch (error) {
        console.error('Error creating event in createEventProject:', error);
        return { message: 'Internal Server error: Function createEventProject.', data: null, code: 400 };
    }
};

export const createNftForEvent = async (event: NFTEvent) => {
    try {
        if (!process.env.UNDERDOG_API_KEY) {
            throw new Error("UNDERDOG_API_KEY is not set");
        }
        const config = {
            headers: { Authorization: `Bearer ${process.env.UNDERDOG_API_KEY}` }
        }
        const nftData = {
            "name": event.event.name,
            "symbol": event.symbol,
            "image": event.event.image,
        }

        const createNftResponse = await axios.post(
            `${underdogApiEndpoint}/v2/projects/${event.projectId}/nfts`,
            nftData,
            config
        );

        let retrieveNFT = null;
        let retries = 0;

        // Polling loop to wait for NFT retrieval
        do {
            retrieveNFT = await axios.get(
                `${underdogApiEndpoint}/v2/projects/${event.projectId}/nfts/${createNftResponse.data.nftId}`,
                config
            );
            await new Promise(resolve => setTimeout(resolve, 100));
            retries++;
        } while ((!retrieveNFT.data || retrieveNFT.data.status !== 'confirmed') && retries < 50);

        if (!retrieveNFT.data || retrieveNFT.data.status !== 'confirmed') {
            throw new Error("NFT could not be confirmed");
        }

        /*
        const signatures = await connection.getSignaturesForAddress(
            new solanaweb3.PublicKey(event.mintAddress),
            { limit: 1 }
        );

        if (signatures.length > 0) {
            const transactionDetails = await connection.getParsedTransaction(
                signatures[0].signature,
                { maxSupportedTransactionVersion: 0 }
            );
        }
        */

        // Transfer the NFT to the buyer's wallet
        const transferResponse = await transferNftToBuyer(
            event.mintAddress,
            event.buyerWalletAddress,
            createNftResponse.data.nftId
        );

        if (transferResponse.code !== 200) {
            throw new Error("NFT transfer failed");
        }

        return { message: 'NFT created and transferred successfully', data: transferResponse.data, code: 200 };

    } catch (error) {
        console.error('Error creating or transferring NFT in createNftForEvent:', error);
        return { message: 'Internal Server error: Function createNftForEvent.', data: null, code: 400 };
    }
}

export const transferNftToBuyer = async (mintAddress: string, buyerWalletAddress: string, nftId: string) => {
    try {
        const transaction = new solanaweb3.Transaction();

        // Create an instruction to transfer the NFT to the buyer's wallet
        const transferInstruction = solanaweb3.SystemProgram.transfer({
            fromPubkey: new solanaweb3.PublicKey(mintAddress),
            toPubkey: new solanaweb3.PublicKey(buyerWalletAddress),
            lamports: 0, // No SOL transfer, only NFT
        });

        transaction.add(transferInstruction);

        // Sign and send the transaction
        const signature = await solanaweb3.sendAndConfirmTransaction(
            connection,
            transaction,
            [/* Include payer's wallet keypair here */]
        );

        return { message: 'NFT transferred successfully', data: signature, code: 200 };
    } catch (error) {
        console.error('Error transferring NFT to buyer:', error);
        return { message: 'Internal Server error: Function transferNftToBuyer.', data: null, code: 400 };
    }
}



/**
 * Mint address: c5kk8Q3TRYLTRttLkgAdQ83QqDaYtEA6eX3BDKAMHLC
Name: Solana Underdog Summit 2024 001
Image: https://imgs.search.brave.com/W6Dh9SpfVkItRcnislYIaP6JWuBNkarWBDopoXCIQXg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kMzRq/bHhwd3JqYTdxOS5j/bG91ZGZyb250Lm5l/dC93cC1jb250ZW50/L3VwbG9hZHMvMjAy/MS8xMi9ORlQtRXZl/bnRzLTEuanBn
*/
/*
let transactionDetails = {
  blockTime: 1723962396,
  meta: {
    computeUnitsConsumed: 97430,
    err: null,
    fee: 5200,
    innerInstructions: [ [Object] ],
    logMessages: [
      'Program ComputeBudget111111111111111111111111111111 invoke [1]',
      'Program ComputeBudget111111111111111111111111111111 success',
      'Program ComputeBudget111111111111111111111111111111 invoke [1]',
      'Program ComputeBudget111111111111111111111111111111 success',
      'Program updg8JyjrmFE2h3d71p71zRXDR8q4C6Up8dDoeq3LTM invoke [1]',
      'Program log: Instruction: MintNftV5',
      'Program BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY invoke [2]',
      'Program log: Instruction: MintToCollectionV1',
      'Program noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV invoke [3]',
      'Program noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV consumed 97 of 119407 compute units',
      'Program noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV success',
      'Program cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK invoke [3]',
      'Program log: Instruction: Append',
      'Program noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV invoke [4]',
      'Program noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV consumed 97 of 107534 compute units',
      'Program noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV success',
      'Program cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK consumed 7972 of 115282 compute units',
      'Program cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK success',
      'Program BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY consumed 45085 of 150137 compute units',
      'Program return: BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY AAj8tDNVQ48kPAwQW+tB75NfaA5xCUo4Q3lEEInXTKqJq7q6ZeT0BxUKxOSEBvY/JEaFaCgvUQy5ZaPsiCAmRs6rurpl5PQHFQrE5IQG9j8kRoVoKC9RDLllo+yIICZGzlcoAAAAAAAArotrrqcPgKYsjXDlkhIgcDLnA7qpWSnImKtoDwjGUAUNGp+NV0eHn/8mZIeSUPOeyO+R+3OSNtlN3BiKxjhR6w==',
      'Program BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY success',
      'Program log: leafIndex: 10327',
      'Program updg8JyjrmFE2h3d71p71zRXDR8q4C6Up8dDoeq3LTM consumed 97130 of 199700 compute units',
      'Program return: updg8JyjrmFE2h3d71p71zRXDR8q4C6Up8dDoeq3LTM AAj8tDNVQ48kPAwQW+tB75NfaA5xCUo4Q3lEEInXTKqJq7q6ZeT0BxUKxOSEBvY/JEaFaCgvUQy5ZaPsiCAmRs6rurpl5PQHFQrE5IQG9j8kRoVoKC9RDLllo+yIICZGzlcoAAAAAAAArotrrqcPgKYsjXDlkhIgcDLnA7qpWSnImKtoDwjGUAUNGp+NV0eHn/8mZIeSUPOeyO+R+3OSNtlN3BiKxjhR6w==',
      'Program updg8JyjrmFE2h3d71p71zRXDR8q4C6Up8dDoeq3LTM success'
    ],
    postBalances: [
      197171475931,    1461600,
          15616720,    1559040,
         449838720,          1,
           1141440,    1176240,
           1343280,    1454640,
           2853600, 5000000000,
        1000000000,    1141440,
           1141440,    1141440,
           1141440,          1
    ],
    postTokenBalances: [],
    preBalances: [
      197171481131,    1461600,
          15616720,    1559040,
         449838720,          1,
           1141440,    1176240,
           1343280,    1454640,
           2853600, 5000000000,
        1000000000,    1141440,
           1141440,    1141440,
           1141440,          1
    ],
    preTokenBalances: [],
    returnData: {
      data: [Array],
      programId: 'BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY'
    },
    rewards: [],
    status: { Ok: null }
  },
  slot: 319626220,
  transaction: {
    message: {
      accountKeys: [Array],
      addressTableLookups: [],
      instructions: [Array],
      recentBlockhash: 'HR4LKhTx5KrhT4faQfV8B2e4qoBQaeKeyovrg3vdf9ev'
    },
    signatures: [
      '27LLoPfoS4vCR7FiKHx8g5DoEauaQMhLrW8zeENXqe9oDNd7moWWeXX6n2Z9F6boc7pk21ENcKruDY1LBUfvctM8'
    ]
  },
  version: 0
}
*/


/**
 * Flow to create an NFT and sell
 * 
 * 1. Create a Event : From UI a event will be created with all info and image.
 *      1.1 A small amount to be deducted from Event Organiser wallet (0.000001 SOL) which will be proof of ownership.
 *      1.2 Save the wallet address for later withdrawl of funds by the Event orgainser.
 *      1.3 In backend project will be created with "createEventProject". 
 * 2. Now for that Event => Project It ready. 
 * 3. When a user will try to buy the ticket for this event => Cost of ticket will be deducted from user wallet. 
 * 4. NFT will be minted on this project, Then NFT will be tranfered to user wallet.
 * 
 */