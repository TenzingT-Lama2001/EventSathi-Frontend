import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useBoundStore } from '@/zustand/store';
import Image from 'next/image';

export function EventSpeakersList() {
  const { event } = useBoundStore((state) => state);
  console.log('List', event.speakers);
  return (
    <div className="my-4 grid grid-cols-gallery gap-4 px-2">
      {event.speakers.map((speaker, index) => (
        <Card key="index">
          <CardHeader>
            <div className=" relative flex h-64 rounded-xl bg-gray-200">
              <Image
                src="https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?w=300&dpr=2&q=80"
                alt={'test'}
                fill={true}
                className="object-cover"
                //className={cn('object-cover transition-all hover:scale-105', 'aspect-square')}
              />
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className=" text-xl font-semibold">{speaker.name}</CardTitle>
            <CardDescription>{speaker.bio}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
