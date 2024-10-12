'use client'
import { useState } from "react";
import { Keypair } from "@solana/web3.js";
import { AnchorWallet, useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useIsMounted from "@/utils/useIsMounted";
import createEvent from "@/app/api/createEvent/createEvent";

export default function Home() {
  const [collectionAccount, _] = useState(Keypair.generate());
  const [eventName, setEventName] = useState("");
  const [eventUri, setEventUri] = useState("");
  const [ticketPrice, setTicketPrice] = useState(0); // in lamports
  const [maxTickets, setMaxTickets] = useState(0);
  const [createdEvent, setCreatedEvent] = useState<any>(null);

  const wallet = useWallet();
  // to fix the hydration error
  const mounted = useIsMounted();

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <div style={{ marginBottom: '20px' }}>
        {mounted && <WalletMultiButton />}
      </div>

      <div>
        <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>
          Create Your Event
        </h1>

        {wallet && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
            <input
              style={{
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                width: '300px',
              }}
              placeholder="Event Name"
              onChange={(e) => setEventName(e.target.value)}
              value={eventName}
            />
            <input
              style={{
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                width: '300px',
              }}
              placeholder="Event URI"
              onChange={(e) => setEventUri(e.target.value)}
              value={eventUri}
            />
            <input
              style={{
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                width: '300px',
              }}
              type="number"
              placeholder="Ticket Price (in lamports)"
              onChange={(e) => setTicketPrice(parseInt(e.target.value))}
              value={ticketPrice}
            />
            <input
              style={{
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                width: '300px',
              }}
              type="number"
              placeholder="Max Tickets"
              onChange={(e) => setMaxTickets(parseInt(e.target.value))}
              value={maxTickets}
            />
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: '#0070f3',
                color: '#fff',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
              }}
              disabled={!eventName || !eventUri || ticketPrice <= 0 || maxTickets <= 0}
              onClick={async () => {
                console.log("Creating event...");
                console.log(eventName, eventUri, ticketPrice, maxTickets);  
                const event = await createEvent(
                  eventName,
                  eventUri,
                  ticketPrice,
                  maxTickets,
                  wallet as AnchorWallet,
                  collectionAccount
                );
                if (event) {
                  setCreatedEvent(event);
                  setEventName("");
                  setEventUri("");
                  setTicketPrice(0);
                  setMaxTickets(0);
                }
              }}
            >
              Create Event!
            </button>
          </div>
        )}

        {wallet && createdEvent && (
          <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2>Event Name: {createdEvent.name}</h2>
            <h2>Event URI: {createdEvent.uri}</h2>
            <h2>Ticket Price: {createdEvent.ticket_price} Lamports</h2>
            <h2>Max Tickets: {createdEvent.max_tickets}</h2>
          </div>
        )}
      </div>
    </div>
  );
}
