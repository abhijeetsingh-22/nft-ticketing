"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Event, User } from "@prisma/client";
import { Filters } from "./Filters";
import { EventCard } from "./EventCard";
import { buyEventTicket } from "@/db/ticket";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { toast } from "sonner";
import { getUserById } from "@/db/users";

export default function AllEvents({
  initialEvents,
}: {
  initialEvents: Event[];
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("500");
  const [selectedOrganizers, setSelectedOrganizers] = useState<string[]>([]);
  const [events, setEvents] = useState(initialEvents);
  const [filteredEvents, setFilteredEvents] = useState(initialEvents);

  const [balance, setBalance] = useState<number | null>(null);
  const { publicKey, signTransaction } = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    if (publicKey) {
      (async function getBalanceEvery10Seconds() {
        const newBalance = await connection.getBalance(publicKey);
        setBalance(newBalance / LAMPORTS_PER_SOL);
        setTimeout(getBalanceEvery10Seconds, 10000);
      })();
    } else {
      setBalance(null);
    }
  }, [publicKey, connection, balance]);

  const handleBuyEventTicket = async (eventId: string) => {
    let selectedEvent = events.filter((event) => event.id === eventId)[0];

    if (!publicKey || !connection || !balance) return;

    toast.promise(
      buyEventTicket(
        selectedEvent,
        publicKey,
        connection,
        balance,
        signTransaction
      ),
      {
        loading: "Processing payment...",
        success:
          "Ticket purchased successfully! Please check your wallet for your NFT",
        error: (err) => `buyEventTicket fail: ${err.message}`,
      }
    );
  };

  useEffect(() => {
    const min = parseFloat(minPrice) || 0;
    const max = parseFloat(maxPrice) || Infinity;

    const filtered = events.filter(
      (event) =>
        event.ticketPrice !== null &&
        event.ticketPrice !== undefined &&
        event.ticketPrice >= min &&
        event.ticketPrice <= max &&
        (selectedOrganizers.length === 0 ||
          selectedOrganizers.includes(
            event.organizerId.toLowerCase().replace(/\s+/g, "")
          ))
    );
    setFilteredEvents(filtered);
  }, [minPrice, maxPrice, selectedOrganizers, events]);

  const handlePriceChange = (
    value: string,
    setter: (value: string) => void
  ) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setter(value);
    } else if (value === "") {
      setter("");
    }
  };

  return (
    <div className='flex lg:flex-row flex-col gap-8'>
      <aside className='space-y-6 w-full lg:w-1/4'>
        <Filters
          minPrice={minPrice}
          maxPrice={maxPrice}
          handlePriceChange={handlePriceChange}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          setSelectedOrganizers={setSelectedOrganizers}
        />
      </aside>

      <section className='space-y-6 w-full lg:w-3/4'>
        <div className='flex space-x-2'>
          <Input
            placeholder='Search by event title or seller'
            className='flex-1'
          />
          <Button>Search</Button>
        </div>

        <div className='space-y-6'>
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              {...event}
              handleBuyEventTicket={handleBuyEventTicket}
            />
          ))}
          {filteredEvents.length === 0 && (
            <p className='text-center text-gray-500'>
              No events match your current filters.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
