'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useEffect, useState } from "react"
import { DatePicker } from "@/components/DatePicker"
import { Checkbox } from "@/components/ui/checkbox"

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  startDate: z.date({ required_error: "Start Date is required" }),
  entryDate: z.date({ required_error: "Entry Date is required" }),
  endDate: z.date({ required_error: "End Date is required" }),
  venueName: z.string().min(1, "Venue Name is required"),
  state: z.string().min(1, "State is required").optional(),
  liveStatus: z.boolean().optional(),
  publicVisibility: z.boolean().optional(),
  endedStatus: z.boolean().optional(),
  attendees: z.string().min(1, "Attendees are required"),
  coverPhoto: z.string().url("Invalid URL"),
  thumbnail: z.string().url("Invalid URL"),
})

export default function AddEvent() {
  const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm({
    resolver: zodResolver(schema)
  })

  const watchStartDate = watch('startDate')
  const watchEntryDate = watch('entryDate')
  const watchEndDate = watch('endDate')

  console.log(errors)

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <MaxWidthWrapper className="bg-slate-200 mt-10 py-10 max-w-7xl">
      <CardHeader>
        <CardTitle>Create New Event</CardTitle>
        <CardDescription>Fill out the details for your new event.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="gap-6 grid" onSubmit={handleSubmit(onSubmit)}>
          <div className="gap-6 grid grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Event Name" {...register("name")} />
              {errors.name && <p className="text-red-500">{errors.name.message?.toString()}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" placeholder="event-slug" {...register("slug")} />
              {errors.slug && <p className="text-red-500">{errors.slug.message?.toString()}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Describe your event" rows={4} {...register("description")} />
            {errors.description && <p className="text-red-500">{errors.description.message?.toString()}</p>}
          </div>

          <div className="gap-6 grid grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="customer-since">Customer since</Label>
              <DatePicker
                selected={watchStartDate}
                onSelect={(date) => setValue('startDate', date)}
              />
              {errors.startDate && <p className="text-red-500">{errors.startDate.message?.toString()}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-since">Customer since</Label>
              <DatePicker
                selected={watchEntryDate}
                onSelect={(date) => setValue('entryDate', date)}
              />
              {errors.entryDate && <p className="text-red-500">{errors.entryDate.message?.toString()}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-since">Customer since</Label>
              <DatePicker
                selected={watchEndDate}
                onSelect={(date) => setValue('endDate', date)}
              />
              {errors.endDate && <p className="text-red-500">{errors.endDate.message?.toString()}</p>}
            </div>
          </div>
          <div className="gap-6 grid grid-cols-2">
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
          <div className="gap-6 grid grid-cols-2">
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
          <div className="gap-6 grid grid-cols-2">
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
            <div className="space-y-2">
              <Label htmlFor="attendees">Attendees</Label>
              <Input id="attendees" placeholder="Attendee Names" {...register("attendees")} />
              {errors.attendees && <p className="text-red-500">{errors.attendees.message?.toString()}</p>}
            </div>
          </div>
          <div className="gap-6 grid grid-cols-2">
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

function CalendarDaysIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  )
}