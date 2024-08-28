"use client"

import { useState, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { CalendarIcon, FilterIcon, ListOrderedIcon, SearchIcon, TicketIcon } from "lucide-react"
import Image from "next/image"
import { Event } from "@prisma/client"




export default function EventsList({ events }: { events: Event[] }) {

  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [filterLocation, setFilterLocation] = useState("")
  const [filterPrice, setFilterPrice] = useState([0, 200])


  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        const nameMatch = event.name.toLowerCase().includes(searchTerm.toLowerCase())
        const locationMatch = filterLocation
          ? event.venueName.toLowerCase().includes(filterLocation.toLowerCase())
          : true
        // const priceMatch = event.price >= filterPrice[0] && event.price <= filterPrice[1]
        return nameMatch && locationMatch
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "date":
            return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          // case "price":
          //   return a.price - b.price
          case "organizer":
            return a.organizerId.localeCompare(b.organizerId)
          default:
            return 0
        }
      })
  }, [events, searchTerm, filterLocation, sortBy])

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 container">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-2xl">Upcoming Events</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <SearchIcon className="top-2.5 left-2.5 absolute w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-64"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <ListOrderedIcon className="w-4 h-4" />
                Sort by: {sortBy === "date" ? "Date" : sortBy === "price" ? "Price" : "Organizer"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="price">Price</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="organizer">Organizer</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <FilterIcon className="w-4 h-4" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="space-y-4 p-4 w-64">
              <div>
                <label htmlFor="location" className="block font-medium text-sm">
                  Location
                </label>
                <Input
                  id="location"
                  type="text"
                  placeholder="Enter location"
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="mt-1 w-full"
                />
              </div>
              <div>
                <label htmlFor="price-range" className="block font-medium text-sm">
                  Price Range
                </label>
                <div className="mt-1" />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <Card key={event.id}>
            <Link href="#" className="block relative rounded-lg overflow-hidden group" prefetch={false}>
              <Image
                src={event.thumbnail || event.coverPhoto || "/no-image.png"}
                alt={event.name}
                width={400}
                height={300}
                className="group-hover:scale-105 w-full h-56 transition-all duration-300 object-cover"
                style={{ aspectRatio: "400/300", objectFit: "cover" }}
              />
              <div className="absolute inset-0 flex justify-center items-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button variant="secondary" size="sm">
                  View Event
                </Button>
              </div>
            </Link>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-lg">{event.name}</h3>
                  <p className="text-muted-foreground text-sm">{event.venueName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground text-sm">{new Date(event.startDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2">
                  <Avatar className="border w-8 h-8">
                    <AvatarImage src="/placeholder-user.jpg" alt={event.organizerId} />
                    <AvatarFallback>{event.organizerId.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  {/* <span className="font-medium text-sm">{event.organizerId}</span> */}
                </div>
                <div className="flex items-center gap-2">
                  <TicketIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground text-sm">${event.ticketPrice}</span>
                  <TicketIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground text-sm">10 left</span>
                </div>
                {/* <Button onClick={() => handleBuyEventTicket(event.id)}>Buy</Button> */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
