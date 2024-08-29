"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format, parse, set } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar, CalendarProps } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DateTimeSelectorProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date) => void;
  label: string;
}

const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({ selectedDate, onDateChange, label, ...calendarProps }) => {
  const TimeSelect = ({ selectedDate, onSelect }: { selectedDate: Date | undefined; onSelect: (date: Date) => void }) => {
    const [hour, setHour] = React.useState("12")
    const [period, setPeriod] = React.useState("AM")

    React.useEffect(() => {
      if (selectedDate) {
        setHour(format(selectedDate, "hh"))
        setPeriod(format(selectedDate, "a"))
      }
    }, [selectedDate])

    const handleHourChange = (newHour: string) => {
      setHour(newHour)
      updateDateTime(newHour, period)
    }

    const handlePeriodChange = (newPeriod: string) => {
      setPeriod(newPeriod)
      updateDateTime(hour, newPeriod)
    }

    const updateDateTime = (hour: string, period: string) => {
      const hourNumber = parseInt(hour, 10)
      const date = selectedDate || new Date()
      const newDate = set(date, {
        hours: period === "PM" ? (hourNumber % 12) + 12 : hourNumber % 12,
        minutes: 0
      })
      onSelect(newDate)
    }

    return (
      <div className="flex space-x-2">
        <Select value={hour} onValueChange={handleHourChange}>
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="Hour" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 12 }).map((_, i) => {
              const hourValue = (i + 1).toString().padStart(2, '0')
              return (
                <SelectItem key={i} value={hourValue}>
                  {hourValue}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
        <Select value={period} onValueChange={handlePeriodChange}>
          <SelectTrigger className="w-[70px]">
            <SelectValue placeholder="AM/PM" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectContent>
        </Select>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <label htmlFor="date-time-picker" className="block font-medium text-gray-700 text-sm">
        {label}
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date-time-picker"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 w-4 h-4" />
            {selectedDate ? format(selectedDate, "PPP hh:00 a") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-auto" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateChange as any}
            initialFocus
            {...calendarProps}
          />
          <div className="p-3 border-t border-border">
            <TimeSelect selectedDate={selectedDate} onSelect={onDateChange as any} />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DateTimeSelector