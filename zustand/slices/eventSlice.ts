import { StateCreator } from 'zustand';

export type Speaker = {
  name: string;
  bio: string;
  photo: string;
};
export type EventLocationType = 'ONLINE' | 'IN_PERSON';

export type Event = {
  title: string;
  description: string;
  tags: string[];
  event_image: string;
  speakers: Speaker[];
  start_date: Date;
  end_date: Date;
  event_location_type: EventLocationType;
  location?: string;
  event_link?: string;
  max_attendees: number;
  registration_deadline: Date;
};

export interface EventSlice {
  event: Event;
  setEvent: (data: Partial<Event>) => void;
}

export const createEventSlice: StateCreator<EventSlice, [], [], EventSlice> = (set) => ({
  event: {
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
    max_attendees: 25,
    registration_deadline: new Date(),
  },
  setEvent: (data: Partial<Event>) => set((prev) => ({ event: { ...prev.event, ...data } })),
});
