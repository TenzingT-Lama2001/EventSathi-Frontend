import { EventData } from '@/app/(event)/event/page';
import axios from '@/lib/axios';

export const createEvent = async (payload: EventData) => {
  const { speakers, ...rest } = payload;
  const result = await axios.post('/api/events', {
    speakers,
    event: rest,
  });
  return result.data;
};
