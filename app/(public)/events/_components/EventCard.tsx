'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, Clock, MapPin, Users, User } from "lucide-react"
import Image from "next/image"
import { Event, User as PrismaUser } from '@prisma/client'
import { getUserById } from "@/db/users"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Routes } from "@/routes"

type EventWithOrganizer = Event & {
  organizer: string
}

interface EventCardProps extends Partial<EventWithOrganizer> {
  handleBuyEventTicket: (id: string) => void
}


export const EventCard = ({ id, name, startDate, venueName, ticketPrice, coverPhoto, organizer, handleBuyEventTicket }: EventCardProps) => {
  const session = useSession()


  const handleBuyTicket = () => {
    if (session.status === "authenticated") {
      handleBuyEventTicket(id as string)
    } else {
      redirect(Routes.LOGIN)
    }
  }

  return (
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
              {organizer || "Unknown Organizer"}
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
              <Button onClick={handleBuyTicket}>Buy</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}





export const EventCardSkeleton = () => (
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

