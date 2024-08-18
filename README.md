
# Project Overview

An NFT Ticketing System that uses blockchain technology to solve problems of the traditional event ticketing process by issuing tickets as NFTs on the Solana blockchain. This system ensures transparent, secure, and efficient ticket issuance, transfer, and validation, addressing many pain points in the current ticketing ecosystem.

## Use Cases
- Concerts and Music Festivals
- Sports Events
- Conferences and Seminars
- Transportation
- Online Events

## Benefits
- **Security:** Each ticket is a unique NFT, making it impossible to duplicate or counterfeit.
- **Transparency:** All transactions are recorded on the blockchain, providing a clear and immutable history of ticket ownership.
- **Efficiency:** Fast and low-cost transactions ensure smooth ticket issuance and transfer.
- **Resale Market:** Enable a legitimate secondary market for ticket resale, with smart contracts enforcing terms and preventing fraud. (This can be implemented later on)
- **Engagement:** Enhanced fan engagement with potential for additional perks or rewards embedded in NFTs (e.g., exclusive content, merchandise discounts) (Not required in v1).

## Use of Solana
- **High Throughput**
- **Low Fees:** Solana’s low transaction fees make microtransactions viable.
- **Security:** Solana’s robust security features ensure the integrity and authenticity of each NFT ticket.
- **Speed:** Solana’s fast block times (400ms) ensure quick confirmation of transactions, enhancing user experience.

### Benefits of Using Solana
- **Scalability:** Solana’s scalability supports the high transaction volume typical in ticketing systems, particularly during high-demand events.
- **Cost-Effectiveness:** Low transaction costs reduce overheads and allow for economically feasible ticket management.
- **Reliability:** High performance and reliable infrastructure ensure consistent and dependable ticketing operations.
- **User Experience:** Quick transaction times improve the overall user experience, from purchasing to event check-in.

# Detailed Workflow

### Event Creation:
1. Event organizers create an event on the platform.
2. Define ticket types, quantities, and prices.
3. Smart contracts are deployed to manage ticket issuance and rules. For v1, we can omit using custom smart contracts.

### Ticket Purchase:
1. Users browse events and purchase tickets using their Solana wallet (need to connect to their wallet).
2. Payment is processed via a Solana transaction, minting the NFT ticket to the buyer’s wallet.
3. The smart contract enforces purchase limits and other conditions (not in v1).

### Ticket Transfer and Resale (Not required in initial v1, will develop this later):
1. Users can transfer or resell tickets through the platform.
2. Transfers are executed via Solana transactions, with the smart contract ensuring compliance with event rules (e.g., price caps).
3. Transaction fees are minimal, encouraging user participation.

### Event Check-In:
- **Online Events:** Provide integration that allows checking if a user is allowed to enter the event.
- **Offline Events:** Users present their NFT tickets via a QR code or directly from their wallet. Event staff verify tickets using a blockchain-based validation tool, ensuring the ticket’s authenticity and ownership.
- Check-in status is updated in real-time on the blockchain.

### Post-Event Engagement (Not required in v1):
- Post-event, NFT tickets can retain value as collectibles or provide access to additional content.
- Event organizers can send updates or exclusive offers to ticket holders via the platform.

# High level Overview of architecture

Not this exactly but something like this. Found this on the internet tbh.
![NFTs in Ticketing](https://d3lkc3n5th01x7.cloudfront.net/wp-content/uploads/2022/03/06235432/nfts-in-ticketing.svg)

# Technical Aspects

### NFT Minting:
- Initially, use Metaplex (Candy Machine). Later, we can write custom smart contracts.
- Use Arweave or IPFS (File storage on the blockchain) to store the metadata of NFTs.

### NFT Sale:
- Connect to Sol wallets (use wallet adapters).
- Transfer NFT to wallets.
- Use Web3.js to handle transactions.
- Signature verification (optional for v1).
- Use package NaCl.

# Weekly Plan

### Week 2 (12th to 18th)
- Initial project setup
- DB schema design
- Add Auth (probably use Auth.js)
- Setup Solana-CLI and wallet (everyone)
- Setup Metaplex Candy-Machine (for minting NFTs)
- Setup Arweave/IPFS for file upload
- Build Core API (more endpoints may be required)
  - /create-event
  - /mint-ticket
  - /show-all-events
  - /my-events

### Week 3 (19th to 26th)
- Create event creation UI
- Wallet integration using wallet adapters
- Create UI for users to connect wallet, buy ticket, and view minted tickets.
- Build the update-ticket status UI and API

### Week 4 (27th to 29th)
- Final testing
- Improving the UI/UX

# How NFT Minting Works

- Used ChaneStack for [Solana node Connection](https://console.chainstack.com/)
- Using [Underdog Protocol](https://www.underdogprotocol.com/) NFT Minting is done.
- NFTs are minted on the blockchain.
- Owner of the NFT is the wallet that paid for the transaction to mint the NFT.

# How to set up locally 

### Setup the repository with nextjs

1. Install the necessary dependencies:
   ```bash
   npm install
   ```

2. Sync & Seed your database:

   ```bash
   npx prisma db push
   npx prisma db seed
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

Now, you can run the project and make changes as needed.