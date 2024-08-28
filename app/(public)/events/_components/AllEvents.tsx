'use client'
import { useState, useEffect, Suspense } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, User } from "lucide-react"
import Image from "next/image"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CheckIcon } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { Event } from '@prisma/client'



export default function AllEvents({ initialEvents }: { initialEvents: Event[] }) {
  const [isLoading, setIsLoading] = useState(false)
  const [minPrice, setMinPrice] = useState("0")
  const [maxPrice, setMaxPrice] = useState("500")
  const [selectedOrganizers, setSelectedOrganizers] = useState<string[]>([])
  const [events, setEvents] = useState(initialEvents)
  const [filteredEvents, setFilteredEvents] = useState(initialEvents)


  useEffect(() => {
    const min = parseFloat(minPrice) || 0
    const max = parseFloat(maxPrice) || Infinity

    const filtered = events.filter(event =>
      event.ticketPrice !== null && event.ticketPrice !== undefined && event.ticketPrice >= min &&
      event.ticketPrice <= max &&
      (selectedOrganizers.length === 0 || selectedOrganizers.includes(event.organizerId.toLowerCase().replace(/\s+/g, '')))
    )
    setFilteredEvents(filtered)
  }, [minPrice, maxPrice, selectedOrganizers, events])

  const handlePriceChange = (value: string, setter: (value: string) => void) => {
    const numValue = parseFloat(value)
    if (!isNaN(numValue) && numValue >= 0) {
      setter(value)
    } else if (value === "") {
      setter("")
    }
  }

  const FiltersSkeleton = () => (
    <div className="space-y-6">
      <Skeleton className="w-3/4 h-8" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-16" />
      <Skeleton className="w-full h-20" />
      <div className="flex space-x-2">
        <Skeleton className="w-1/2 h-10" />
        <Skeleton className="w-1/2 h-10" />
      </div>
    </div>
  )

  const EventCardSkeleton = () => (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex sm:flex-row flex-col">
          <Skeleton className="w-full sm:w-[200px] h-[200px]" />
          <div className="flex-1 p-6">
            <Skeleton className="mb-2 w-3/4 h-6" />
            <Skeleton className="mb-4 w-1/2 h-4" />
            <div className="space-y-2">
              <Skeleton className="w-1/2 h-4" />
              <Skeleton className="w-2/3 h-4" />
              <Skeleton className="w-1/3 h-4" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const EventCard = ({ name, startDate, venueName, ticketPrice, coverPhoto, organizerId }: Partial<Event>) => (
    <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className="p-0">
        <div className="flex sm:flex-row flex-col">
          <div className="relative w-full sm:w-[200px] h-[200px]">
            <Image src={coverPhoto || "/placeholder.svg?height=200&width=200"} alt={name || "Event Image"} layout="fill" objectFit="cover" />
            {/* <Badge className="top-2 left-2 absolute bg-primary text-primary-foreground">
              {category}
            </Badge> */}
          </div>
          <div className="flex-1 p-6">
            <h3 className="mb-1 font-semibold text-xl">{name}</h3>
            <p className="flex items-center mb-3 text-gray-600 text-sm">
              <User className="mr-1 w-4 h-4 text-primary" />
              {/* {organizer?.name || "Unknown Organizer"} */}
              {organizerId}
            </p>
            <div className="space-y-2 text-gray-600 text-sm">
              <div className="flex items-center">
                <Calendar className="mr-2 w-4 h-4 text-primary" />
                <span>{new Date(startDate || "").toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 w-4 h-4 text-primary" />
                <span>{venueName}</span>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="font-bold text-lg text-primary">${ticketPrice?.toFixed(2)}</span>
              <Button variant="outline" size="sm" className="group">
                View Event
                <Users className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const Content = () => (
    <div className="flex lg:flex-row flex-col gap-8">
      <aside className="space-y-6 w-full lg:w-1/4">
        <Card>
          <CardContent className="space-y-6 p-6">
            <div>
              <h2 className="mb-2 font-semibold text-lg">Filters</h2>
              <div className="flex justify-between items-center">
                <span className="text-sm">Verified only</span>
                <Switch />
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-sm">Price Range</h3>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => handlePriceChange(e.target.value, setMinPrice)}
                  className="w-1/2"
                />
                <span>-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => handlePriceChange(e.target.value, setMaxPrice)}
                  className="w-1/2"
                />
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-sm">Dates</h3>
              <div className="space-y-2">
                <Input placeholder="From" type="date" />
                <Input placeholder="To" type="date" />
              </div>
            </div>

            {/* <div>
              <h3 className="mb-2 font-semibold text-sm">Organisers</h3>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start w-full">
                    {selectedOrganizers.length > 0
                      ? `${selectedOrganizers.length} selected`
                      : "Select organizers"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[200px]">
                  <Command>
                    <CommandInput placeholder="Search organizers..." />
                    <CommandEmpty>No organizer found.</CommandEmpty>
                    <CommandGroup>
                      {organizers.map((organizer) => (
                        <CommandItem
                          key={organizer.value}
                          onSelect={() => {
                            setSelectedOrganizers((prev) =>
                              prev.includes(organizer.value)
                                ? prev.filter((item) => item !== organizer.value)
                                : [...prev, organizer.value]
                            )
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedOrganizers.includes(organizer.value)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {organizer.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div> */}

            <div className="flex space-x-2">
              <Button className="flex-1">Apply</Button>
              <Button variant="outline" className="flex-1" onClick={() => {
                setMinPrice("0");
                setMaxPrice("500");
                setSelectedOrganizers([]);
              }}>Reset</Button>
            </div>
          </CardContent>
        </Card>
      </aside>

      <section className="space-y-6 w-full lg:w-3/4">
        <div className="flex space-x-2">
          <Input placeholder="Search by event title or seller" className="flex-1" />
          <Button>Search</Button>
        </div>

        <div className="space-y-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
          {filteredEvents.length === 0 && (
            <p className="text-center text-gray-500">No events match your current filters.</p>
          )}
        </div>
      </section>
    </div>
  )

  return (
    <div className="bg-white p-4 md:p-8 min-h-screen text-gray-900">
      <Suspense fallback={
        <div className="flex lg:flex-row flex-col gap-8">
          <aside className="w-full lg:w-1/4">
            <FiltersSkeleton />
          </aside>
          <section className="space-y-6 w-full lg:w-3/4">
            <Skeleton className="w-full h-10" />
            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <EventCardSkeleton key={item} />
              ))}
            </div>
          </section>
        </div>
      }>
        <Content />
      </Suspense>
    </div>
  )
}