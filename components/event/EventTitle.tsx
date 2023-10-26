import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useBoundStore } from '@/zustand/store';

export function EventTitle() {
  const { event, setEvent } = useBoundStore((state) => state);
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
          value={event.title}
          autoCapitalize="none"
          autoComplete="title"
          autoCorrect="off"
          onChange={(e) =>
            setEvent({
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
          value={event.description}
          onChange={(e) =>
            setEvent({
              description: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
}
