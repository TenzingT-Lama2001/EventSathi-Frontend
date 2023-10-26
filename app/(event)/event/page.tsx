'use client';

import { createEvent } from '@/api/event';
import { EventDetails } from '@/components/event/EventDetails';
import { EventSpeakers } from '@/components/event/EventSpeakers';
import { EventTags } from '@/components/event/EventTags';
import { EventTitle } from '@/components/event/EventTitle';
import { Icons } from '@/components/icons';
import { Button, buttonVariants } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

export type EventData = {
  title: string;
  description: string;
  tags: string[];
  event_image: string;
  speakers: {
    name: string;
    bio: string;
    photo: string;
  }[];
  start_date: Date;
  end_date: Date;
  event_location_type: 'ONLINE' | 'IN_PERSON';
  location?: string;
  event_link?: string;
  max_attendees?: number;
  registration_deadline?: Date;
};

const INITIAL_DATA: EventData = {
  title: '',
  description: '',
  tags: [],
  speakers: [],
  start_date: new Date(),
  end_date: new Date(),
  event_location_type: 'IN_PERSON',
  event_image: 'https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?w=300&dpr=2&q=80',
  location: '',
  event_link: '',
  max_attendees: 15,
  registration_deadline: new Date(),
};

export default function EventPage() {
  const [data, setData] = useState(INITIAL_DATA);
  const { toast } = useToast();

  function updateFields(fields: Partial<EventData>) {
    setData((prev) => {
      return {
        ...prev,
        ...fields,
      };
    });
  }
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    console.log({ data });
    createEventMutation(data);
  }

  const { mutate: createEventMutation } = useMutation({
    mutationFn: (data: EventData) => createEvent(data),
    onSuccess: (data) => {
      console.log({ data });
      toast({
        title: 'Event created successfully',
        // description: 'Check your mail to confirm activate your account.',
      });
    },
    onError: (err: any) => {
      toast({
        title: 'Something went wrong.',
        description: err.message ?? err.response.data.message ?? err.data.message ?? 'Something went wrong',
        variant: 'destructive',
      });
    },
  });

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultiStepForm([
    <EventSpeakers {...data} updateFields={updateFields} />,
    <EventTitle {...data} updateFields={updateFields} />,
    <EventDetails {...data} updateFields={updateFields} />,
    <EventTags {...data} updateFields={updateFields} />,
  ]);
  return (
    <div className="relative mx-auto w-[calc(100%-20%)] md:w-[calc(100%-30%)] ">
      {!isFirstStep && (
        <button
          // href="/dashboard"
          onClick={back}
          className={cn(buttonVariants({ variant: 'ghost' }), 'absolute top-2  md:left-1 md:top-0')}
        >
          <>
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            Back
          </>
        </button>
      )}
      <button
        onClick={onSubmit}
        className={cn(buttonVariants({ variant: 'ghost' }), 'absolute right-0 top-1 md:right-1 md:top-0')}
      >
        <>
          <Icons.chevronRight className="mr-2 h-4 w-4" />
          {isLastStep ? 'Finish' : 'Next'}
        </>
      </button>
      <div className="absolute top-16 mx-auto w-full md:top-16 ">
        <form className="mx-auto w-full md:w-[80%] lg:w-[60%] xl:w-[50%]">{step}</form>
      </div>
    </div>
  );
}
