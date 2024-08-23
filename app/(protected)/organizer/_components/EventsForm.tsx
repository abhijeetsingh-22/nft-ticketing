'use client'

import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup } from "@/components/ui/select"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { DatePicker } from "@/components/DatePicker"
import { Checkbox } from "@/components/ui/checkbox"
import { createOrUpdateEvent } from "@/db/events"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { UploadButton, UploadDropzone } from "@/lib/uploadthing"
import { useEffect } from "react"
import Image from "next/image"

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  startDate: z.date({ required_error: "Start Date is required" }),
  endDate: z.date({ required_error: "End Date is required" }),
  venueName: z.string().min(1, "Venue Name is required"),
  state: z.string().optional(),
  coverPhoto: z.string().url(),
  thumbnail: z.string().url(),
  numberOfTickets: z.number().min(10, "Number of tickets is required"),
  ticketPrice: z.number().min(0, "Ticket price is required"),
}).refine(data => data.endDate > data.startDate, {
  message: "End Date should be greater than Start Date",
  path: ["endDate"],
})

export type EventFormType = z.infer<typeof schema>

export default function EventsForm({ organiserId, event }: { organiserId: string, event?: Event }) {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm<EventFormType>({
    resolver: zodResolver(schema),
    defaultValues: event ? { ...event } as any : undefined
  })

  const watchName = watch('name')
  const watchSlug = watch('slug')

  useEffect(() => {
    setValue("slug", watchName?.toLowerCase().replace(/[^a-z0-9]+/g, '-'))
  }, [watchName, watchSlug])

  const watchStartDate = watch('startDate')
  const watchEndDate = watch('endDate')

  console.log(errors)

  const onSubmit = async (data: any) => {
    data.organizerId = organiserId
    toast.promise(
      createOrUpdateEvent({ organizerId: organiserId, ...data }).then(() => {
        router.push(`/organizer/${organiserId}/events`)
      }),
      {
        loading: 'Updating event...',
        success: 'Event updated successfully',
        error: 'Failed to update event',
      }
    )

  }

  return (
    <MaxWidthWrapper className="bg-slate-200 mt-10 py-10 max-w-7xl">
      <Button variant="outline" onClick={() => router.back()}>Back</Button>
      <CardHeader>
        <CardTitle>Create New Event</CardTitle>
        <CardDescription>Fill out the details for your new event.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="gap-6 grid" onSubmit={handleSubmit(onSubmit)}>
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Event Name" {...register("name")} />
              {errors.name && <p className="text-red-500">{errors.name.message?.toString()}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Describe your event" rows={4} {...register("description")} />
            {errors.description && <p className="text-red-500">{errors.description.message?.toString()}</p>}
          </div>

          <div className="gap-6 grid grid-cols-1 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <DatePicker
                allowOnlyFutureDates={true}
                selected={watchStartDate}
                onSelect={(date) => setValue('startDate', date)}
              />
              {errors.startDate && <p className="text-red-500">{errors.startDate.message?.toString()}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <DatePicker
                allowOnlyFutureDates={true}
                selected={watchEndDate}
                onSelect={(date) => setValue('endDate', date)}
              />
              {errors.endDate && <p className="text-red-500">{errors.endDate.message?.toString()}</p>}
            </div>
          </div>
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="venue-name">Venue Name</Label>
              <Input id="venue-name" placeholder="Venue Name" {...register("venueName")} />
              {errors.venueName && <p className="text-red-500">{errors.venueName.message?.toString()}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="state">State</Label>
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ?? undefined}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="ca">California</SelectItem>
                        <SelectItem value="ny">New York</SelectItem>
                        <SelectItem value="tx">Texas</SelectItem>
                        <SelectItem value="fl">Florida</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.state && <p className="text-red-500">{errors.state.message?.toString()}</p>}
            </div>
          </div>
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="number-of-tickets">Number of Tickets</Label>
              <Input id="number-of-tickets" placeholder="Number of Tickets" type="number" {...register("numberOfTickets", { valueAsNumber: true })} />
              {errors.numberOfTickets && <p className="text-red-500">{errors.numberOfTickets.message?.toString()}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="ticket-price">Ticket Price</Label>
              <Input id="ticket-price" placeholder="Ticket Price" type="number" step="0.01" {...register("ticketPrice", { valueAsNumber: true })} />
              {errors.ticketPrice && <p className="text-red-500">{errors.ticketPrice.message?.toString()}</p>}
            </div>
          </div>
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cover-photo">Cover Photo</Label>
              {watch("coverPhoto") ? (
                <Image src={watch("coverPhoto")} alt="Cover Photo" className="w-full h-auto" width={200} height={200} />
              ) : (
                <UploadDropzone

                  endpoint="imageUploader"
                  onClientUploadComplete={(res: any) => {
                    setValue("coverPhoto", res[0].url)
                    toast.success("Upload Completed");
                  }}
                  onUploadError={(error: Error) => {
                    console.log("error", error);
                    toast.error(`ERROR! ${error.message}`);
                  }}
                />
              )}
              {errors.coverPhoto && <p className="text-red-500">{errors.coverPhoto.message?.toString()}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="thumbnail">Thumbnail</Label>
              {watch("thumbnail") ? (
                <Image src={watch("thumbnail")} alt="Thumbnail" className="w-full h-auto" width={200} height={200} />
              ) : (
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res: any) => {
                    setValue("thumbnail", res[0].url)
                    toast.success("Upload Completed");
                  }}
                  onUploadError={(error: Error) => {
                    console.log("error", error);
                    toast.error(`ERROR! ${error.message}`);
                  }}
                />
              )}
              {errors.thumbnail && <p className="text-red-500">{errors.thumbnail.message?.toString()}</p>}
            </div>
          </div>

          <CardFooter className="flex justify-end gap-4">
            <Button variant="outline">Cancel</Button>
            <Button type="submit">Create Event</Button>
          </CardFooter>
        </form>
      </CardContent>
    </MaxWidthWrapper>
  )
}