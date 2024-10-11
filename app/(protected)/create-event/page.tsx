import { useState } from "react";
import { Keypair } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import styles from "../styles/Home.module.css";
import useIsMounted from "@/utils/useIsMounted";
import createEvent from "@/app/api/createEvent/createEvent";

export default function Home() {
  const [collectionAccount, _] = useState(Keypair.generate());
  const [eventName, setEventName] = useState("");
  const [eventUri, setEventUri] = useState("");
  const [ticketPrice, setTicketPrice] = useState(0); // in lamports
  const [maxTickets, setMaxTickets] = useState(0);

  const [createdEvent, setCreatedEvent] = useState<any>(null);

  const wallet = useAnchorWallet();
  const mounted = useIsMounted();

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>{mounted && <WalletMultiButton />}</div>

      <div className={styles.main}>
        <h1 className={styles.title}>
          Create Your Event with{" "}
          <a href="https://www.startonsolana.com">Solana</a>!
        </h1>

        {wallet && (
          <div className={styles.form}>
            <input
              className={styles.input}
              placeholder="Event Name"
              onChange={(e) => setEventName(e.target.value)}
              value={eventName}
            />
            <input
              className={styles.input}
              placeholder="Event URI"
              onChange={(e) => setEventUri(e.target.value)}
              value={eventUri}
            />
            <input
              className={styles.input}
              type="number"
              placeholder="Ticket Price (in lamports)"
              onChange={(e) => setTicketPrice(parseInt(e.target.value))}
              value={ticketPrice}
            />
            <input
              className={styles.input}
              type="number"
              placeholder="Max Tickets"
              onChange={(e) => setMaxTickets(parseInt(e.target.value))}
              value={maxTickets}
            />
            <button
              className={styles.button}
              disabled={!eventName || !eventUri || ticketPrice <= 0 || maxTickets <= 0}
              onClick={async () => {
                const event = await createEvent(
                  eventName,
                  eventUri,
                  ticketPrice,
                  maxTickets,
                  wallet,
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
          <div className={styles.card}>
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
