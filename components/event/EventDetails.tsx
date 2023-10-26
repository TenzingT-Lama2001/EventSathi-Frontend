import { cn } from '@/lib/utils';
import { LoginDto } from '../auth/LoginForm';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/validations/auth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { buttonVariants } from '../ui/button';
import { Icons } from '../icons';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from '../DatePicker';
import { TabsDemo } from '../Tabs';
import { DateTimePicker } from '../ui/date-time-picker/date-time-picker';
import { TimePicker } from '../ui/date-time-picker/time-picker';

export type EventDetailsData = {
  start_date: Date;
  event_location_type: 'ONLINE' | 'IN_PERSON';
  location?: string;
  event_link?: string;
  max_attendees?: number;
  registration_deadline?: Date;
  end_date: Date;
};

export type TabsDemoProps = {
  updateFields: (fields: Partial<EventDetailsData>) => void;
  location?: string;
  event_link?: string;
  max_attendees?: number;
  event_location_type: 'ONLINE' | 'IN_PERSON';
};

type EventDetailsProps = EventDetailsData & {
  updateFields: (fields: Partial<EventDetailsData>) => void;
};
export function EventDetails({
  start_date,
  end_date,
  registration_deadline,
  location,
  event_link,
  max_attendees,
  event_location_type,
  updateFields,
}: EventDetailsProps) {
  const tabsProps: TabsDemoProps = {
    updateFields,
    location,
    event_link,
    max_attendees,
    event_location_type,
  };

  return (
    <div className="mt-2 flex w-full flex-col">
      <h2 className="mb-5 text-center font-sans text-2xl">Tell us more about your event</h2>
      <div className="mt-5 flex items-center justify-center">
        <div className="flex flex-col justify-around gap-4">
          <div className=" flex flex-col gap-2">
            <span>Event Start Date</span>
            <DatePicker updateFields={updateFields} type="start_date" initialDate={start_date} />
          </div>
          <div className=" flex flex-col gap-2">
            <span>Event End Date</span>
            <DatePicker updateFields={updateFields} type="end_date" initialDate={end_date} />
          </div>
          <div className=" flex flex-col gap-2">
            <span>Registration deadline</span>
            <DatePicker updateFields={updateFields} type="registration_deadline" initialDate={registration_deadline} />
          </div>
          <div className="">
            <TabsDemo {...tabsProps} />
          </div>
        </div>
      </div>
    </div>
  );
}
