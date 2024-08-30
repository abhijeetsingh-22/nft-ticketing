'use client'
import { useState } from 'react'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { CalendarIcon, MapPinIcon, TicketIcon, TagIcon, PlusIcon, MinusIcon, Share2Icon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Event } from '@prisma/client'
import Image from 'next/image'
import { toast } from 'sonner'


const organizer = {
  name: "Crypto Events Inc.",
  image: "/placeholder.svg?height=100&width=100",
  bio: "Crypto Events Inc. is a pioneering event management company specializing in blockchain and NFT-based experiences. With a team of tech-savvy professionals and a passion for innovation, we create unforgettable events that bridge the gap between the digital and physical worlds.",
  eventsHosted: 15,
}

export default function EventDetails({ event }: { event: Event }) {
  const [isMinting, setIsMinting] = useState(false)

  // const handleTicketChange = (increment: number) => {
  //   setTicketCount(prev => Math.max(prev + increment, 0));
  // }

  const handleMintNFT = () => {
    setIsMinting(true)
    // Simulating minting process
    setTimeout(() => {
      setIsMinting(false)
      toast.success("NFT minted successfully!")
    }, 2000)
  }

  const handleShareEvent = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast.success('Event URL copied to clipboard');
    }).catch(err => {
      toast.error('Failed to copy event URL');
    });
  }


  return (
    <div className="mx-auto px-4 py-8 container">
      <div className="space-y-8">
        {/* Event Header */}
        <motion.div
          className="relative rounded-xl w-full h-96 overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={event.coverPhoto}
            alt={event.name}
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
          <motion.div
            className="right-0 bottom-0 left-0 absolute bg-gradient-to-t from-black to-transparent p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="font-bold text-4xl text-white">{event.name}</h1>
            <p className="mt-2 text-gray-200 text-xl">{format(event.startDate, "PPP")} - {format(event.endDate, "PPP")}</p>
          </motion.div>
        </motion.div>

        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <Button className="mt-4 w-full" onClick={handleMintNFT} disabled={isMinting}>
              {isMinting ? "Minting..." : "Mint NFT Tickets"}
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <Button
              variant="outline"
              onClick={handleShareEvent}
            >
              <Share2Icon className="mr-2 w-4 h-4" />
              Share Event
            </Button>
          </motion.div>
        </div>

        {/* Event Details */}
        <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
          <motion.div
            className="space-y-6 md:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h2 className="mb-4 font-semibold text-2xl">About the Event</h2>
              <p className="text-gray-700">{event.description}</p>
            </div>

            <div className="gap-4 grid grid-cols-2">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5 text-gray-500" />
                <span>{format(event.startDate, "PPP")} - {format(event.endDate, "PPP")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPinIcon className="w-5 h-5 text-gray-500" />
                <span>{event.venueName}, {event.venueAddress}, {event.zipCode}</span>
              </div>
              <div className="flex items-center space-x-2">
                <TicketIcon className="w-5 h-5 text-gray-500" />
                <span>{event.numberOfTicketsSold} / {event.numberOfTickets} tickets sold</span>
              </div>
              <div className="flex items-center space-x-2">
                <TagIcon className="w-5 h-5 text-gray-500" />
                <span>NFT Symbol: {event.nftSymbol}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant={event.liveStatus ? "default" : "secondary"}>
                {event.liveStatus ? "Live" : "Not Live"}
              </Badge>
              <Badge variant={event.publicVisibility ? "default" : "secondary"}>
                {event.publicVisibility ? "Public" : "Private"}
              </Badge>
              <Badge variant={event.endedStatus ? "destructive" : "default"}>
                {event.endedStatus ? "Ended" : "Active"}
              </Badge>
            </div>

            <Separator />


          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* About Organizer */}
            <motion.div
              className="bg-gray-100 p-6 rounded-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="mb-4 font-semibold text-2xl">About Organizer</h2>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={organizer.image} alt={organizer.name} />
                  <AvatarFallback>{organizer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{organizer.name}</h3>
                  <p className="text-gray-500 text-sm">{organizer.eventsHosted} events hosted</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">{organizer.bio}</p>
            </motion.div>

            {/* Event Timeline */}
            <motion.div
              className="bg-gray-100 p-6 rounded-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="mb-4 font-semibold text-2xl">Event Timeline</h2>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5 text-gray-500" />
                  <span>Entry: {format(event?.entryDate || new Date(), "pp")}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5 text-gray-500" />
                  <span>Start: {format(event.startDate, "pp")}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5 text-gray-500" />
                  <span>End: {format(event.endDate, "pp")}</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}