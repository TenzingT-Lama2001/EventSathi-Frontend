import { create } from 'zustand';
import { EventSlice, createEventSlice } from './slices/eventSlice';

export const useBoundStore = create<EventSlice>()((...a) => ({
  ...createEventSlice(...a),
}));
