"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
const events = [
  {
    id: 1,
    name: "Tech Conference 2024",
    image: "/placeholder.svg",
    location: "San Francisco, CA",
    date: "2024-06-15",
    price: 99.99,
    organizer: {
      name: "John Doe",
      avatar: "/placeholder-user.jpg",
    },
    ticketsLeft: 150,
  },
  {
    id: 2,
    name: "Art Showcase",
    image: "/placeholder.svg",
    location: "New York City, NY",
    date: "2024-07-20",
    price: 25.0,
    organizer: {
      name: "Jane Smith",
      avatar: "/placeholder-user.jpg",
    },
    ticketsLeft: 80,
  },
  {
    id: 3,
    name: "Music Festival",
    image: "/placeholder.svg",
    location: "Los Angeles, CA",
    date: "2024-08-10",
    price: 75.0,
    organizer: {
      name: "Michael Johnson",
      avatar: "/placeholder-user.jpg",
    },
    ticketsLeft: 300,
  },
  {
    id: 4,
    name: "Culinary Workshop",
    image: "/placeholder.svg",
    location: "Chicago, IL",
    date: "2024-09-05",
    price: 50.0,
    organizer: {
      name: "Sarah Lee",
      avatar: "/placeholder-user.jpg",
    },
    ticketsLeft: 40,
  },
  {
    id: 5,
    name: "Wellness Retreat",
    image: "/placeholder.svg",
    location: "Seattle, WA",
    date: "2024-10-01",
    price: 150.0,
    organizer: {
      name: "David Kim",
      avatar: "/placeholder-user.jpg",
    },
    ticketsLeft: 20,
  },
]
export default function Component() {

  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [filterLocation, setFilterLocation] = useState("")
  const [filterPrice, setFilterPrice] = useState([0, 200])
  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        const nameMatch = event.name.toLowerCase().includes(searchTerm.toLowerCase())
        const locationMatch = filterLocation
          ? event.location.toLowerCase().includes(filterLocation.toLowerCase())
          : true
        const priceMatch = event.price >= filterPrice[0] && event.price <= filterPrice[1]
        return nameMatch && locationMatch && priceMatch
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "date":
            return new Date(a.date) - new Date(b.date)
          case "price":
            return a.price - b.price
          case "organizer":
            return a.organizer.name.localeCompare(b.organizer.name)
          default:
            return 0
        }
      })
  }, [searchTerm, sortBy, filterLocation, filterPrice])
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
              <img
                src="/placeholder.svg"
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
                  <p className="text-muted-foreground text-sm">{event.location}</p>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground text-sm">{new Date(event.date).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2">
                  <Avatar className="border w-8 h-8">
                    <AvatarImage src="/placeholder-user.jpg" alt={event.organizer.name} />
                    <AvatarFallback>{event.organizer.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-sm">{event.organizer.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TicketIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground text-sm">${event.price.toFixed(2)}</span>
                  <TicketIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground text-sm">{event.ticketsLeft} left</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}


function FilterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}


function ListOrderedIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  )
}


function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function TicketIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2" />
      <path d="M13 17v2" />
      <path d="M13 11v2" />
    </svg>
  )
}