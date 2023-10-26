'use client';
import * as React from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { EventDetailsData } from './event/EventDetails';

type DatePickerProps = {
  placeholder?: string;
  updateFields: (fields: Partial<EventDetailsData>) => void;
  type: 'start_date' | 'end_date' | 'registration_deadline';
  initialDate?: Date;
};

export function DatePicker({ placeholder = 'Pick a date', updateFields, type, initialDate }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(initialDate);
  React.useEffect(() => {
    if (date) {
      console.log(date);
      updateFields({ [type]: date });
    }
  }, [date]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn('w-[400px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
