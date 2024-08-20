'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { CalendarProps } from '@/components/ui/calendar';
import { PopoverProps } from '@radix-ui/react-popover';

type DatePickerProps = {
  selected: Date;
  onSelect: (date: Date) => void;
  placeholder?: string;
  className?: string;
} & PopoverProps &
  CalendarProps;

export function DatePicker({
  selected,
  onSelect,
  placeholder,
  className,
  ...props
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      onSelect(date);
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !selected && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 w-4 h-4" />
          {selected ? (
            <span className="text-foreground">{format(selected, 'PPP')}</span>
          ) : (
            <span className="text-foreground">
              {placeholder ?? 'Pick a date'}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-auto">
        <Calendar

          className={cn('w-full', className)}
          mode="single"
          selected={selected}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
