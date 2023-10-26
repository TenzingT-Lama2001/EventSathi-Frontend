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

type EventTitleData = {
  title: string;
  description: string;
};

type EventTitleProps = EventTitleData & {
  updateFields: (fields: Partial<EventTitleData>) => void;
};
export function EventTitle({ title, description, updateFields }: EventTitleProps) {
  return (
    <div className="mt-2 flex w-full flex-col">
      <h2 className="mb-2 text-center text-xl">Tell us about your event</h2>

      <div className="mt-4">
        <Label className="sr-only" htmlFor="title">
          Title
        </Label>
        <Input
          id="title"
          placeholder="Title"
          type="text"
          value={title}
          autoCapitalize="none"
          autoComplete="title"
          autoCorrect="off"
          onChange={(e) =>
            updateFields({
              title: e.target.value,
            })
          }
        />
      </div>

      <div className="mt-4">
        <Label className="sr-only" htmlFor="description">
          Description
        </Label>
        <Textarea
          id="description"
          placeholder="Description"
          autoCapitalize="none"
          autoComplete="description"
          autoCorrect="off"
          className="min-h-[240px]  p-4 md:min-h-[200px]"
          value={description}
          onChange={(e) =>
            updateFields({
              description: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
}
