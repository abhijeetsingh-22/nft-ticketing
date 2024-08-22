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
import { createEvent } from "@/db/events"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { UploadButton } from "@/lib/uploadthing"

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  startDate: z.date({ required_error: "Start Date is required" }),
  entryDate: z.date({ required_error: "Entry Date is required" }),
  endDate: z.date({ required_error: "End Date is required" }),
  venueName: z.string().min(1, "Venue Name is required"),
  state: z.string().optional(),
  liveStatus: z.boolean().optional(),
  publicVisibility: z.boolean().optional(),
  endedStatus: z.boolean().optional(),
  coverPhoto: z.string().optional(),
  thumbnail: z.string().optional(),
}).refine(data => data.endDate > data.startDate && data.endDate > data.entryDate, {
  message: "End Date should be greater than Start Date and Entry Date",
  path: ["endDate"],
}).refine(data => data.entryDate > data.startDate && data.entryDate < data.endDate, {
  message: "Entry Date should be between Start Date and End Date",
  path: ["entryDate"],
})

export type EventFormType = z.infer<typeof schema>

export default function EventsForm({ organiserId, event }: { organiserId: string, event?: Event }) {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm<EventFormType>({
    resolver: zodResolver(schema),
    defaultValues: event ? { ...event } as any : undefined
  })

  // console.log("event", event);


  const watchStartDate = watch('startDate')
  const watchEntryDate = watch('entryDate')
  const watchEndDate = watch('endDate')

  console.log(errors)

  const onSubmit = async (data: any) => {
    data.organizerId = organiserId
    toast.promise(
      createEvent({ organizerId: organiserId, ...data }).then(() => {
        router.push(`/organizer/${organiserId}/events`)
      }),
      {
        loading: 'Creating event...',
        success: 'Event created successfully',
        error: 'Failed to create event',
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
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                defaultValue={watch('name')?.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                placeholder="event-slug"
                {...register("slug", {
                  setValueAs: value => value.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                })}
              />
              {errors.slug && <p className="text-red-500">{errors.slug.message?.toString()}</p>}
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
              <Label htmlFor="entry-date">Entry Date</Label>
              <DatePicker

                allowOnlyFutureDates={true}
                selected={watchEntryDate}
                onSelect={(date) => setValue('entryDate', date)}
              />
              {errors.entryDate && <p className="text-red-500">{errors.entryDate.message?.toString()}</p>}
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
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Controller
                  name="liveStatus"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value ?? undefined}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="liveStatus">Live Status</Label>
              </div>
              {errors.liveStatus && <p className="text-red-500">{errors.liveStatus.message?.toString()}</p>}
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Controller
                  name="publicVisibility"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value ?? undefined}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="publicVisibility">Public Visibility</Label>
              </div>
              {errors.publicVisibility && <p className="text-red-500">{errors.publicVisibility.message?.toString()}</p>}
            </div>
          </div>
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Controller
                  name="endedStatus"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value ?? undefined}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="endedStatus">Ended Status</Label>
              </div>
              {errors.endedStatus && <p className="text-red-500">{errors.endedStatus.message?.toString()}</p>}
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="attendees">Attendees</Label>
              <Input id="attendees" placeholder="Attendee Names" {...register("attendees")} />
              {errors.attendees && <p className="text-red-500">{errors.attendees.message?.toString()}</p>}
            </div> */}
          </div>
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cover-photo">Cover Photo URL</Label>
              <Input id="cover-photo" placeholder="https://example.com/cover.jpg" {...register("coverPhoto")} />
              {errors.coverPhoto && <p className="text-red-500">{errors.coverPhoto.message?.toString()}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="thumbnail">Thumbnail URL</Label>
              <Input id="thumbnail" placeholder="https://example.com/thumbnail.jpg" {...register("thumbnail")} />
              {errors.thumbnail && <p className="text-red-500">{errors.thumbnail.message?.toString()}</p>}
            </div>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res: any) => {
                // Do something with the response
                console.log("Files: ", res);
                alert("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                console.log("error", error);

                alert(`ERROR! ${error.message}`);
              }}
            />
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