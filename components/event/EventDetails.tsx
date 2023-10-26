import { DatePicker } from '../DatePicker';
import { EventTypeTab } from './EventTypeTab';
import { useBoundStore } from '@/zustand/store';

export function EventDetails() {
  const { event } = useBoundStore((state) => state);

  return (
    <div className="mt-2 flex w-full flex-col">
      <h2 className="mb-5 text-center font-sans text-2xl">Tell us more about your event</h2>
      <div className="mt-5 flex items-center justify-center">
        <div className="flex flex-col justify-around gap-4">
          <div className=" flex flex-col gap-2">
            <span>Event Start Date</span>
            <DatePicker type="start_date" initialDate={event.start_date} />
          </div>
          <div className=" flex flex-col gap-2">
            <span>Event End Date</span>
            <DatePicker type="end_date" initialDate={event.end_date} />
          </div>
          <div className=" flex flex-col gap-2">
            <span>Registration deadline</span>
            <DatePicker type="registration_deadline" initialDate={event.registration_deadline} />
          </div>
          <div className="">
            <EventTypeTab />
          </div>
        </div>
      </div>
    </div>
  );
}
