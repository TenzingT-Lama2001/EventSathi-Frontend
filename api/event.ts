import axios from '@/lib/axios';
import { Event } from '@/zustand/slices/eventSlice';

export const createEvent = async (payload: Event) => {
  const { speakers, ...rest } = payload;
  const result = await axios.post('/api/events', {
    speakers,
    event: rest,
  });
  return result.data;
};
