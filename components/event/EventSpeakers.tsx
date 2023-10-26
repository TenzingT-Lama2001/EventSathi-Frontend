import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '../ui/textarea';
import { EventSpeakersList } from './EventSpeakersList';
type EventSpeakersData = {
  speakers: {
    name: string;
    bio: string;
    photo: string;
  }[];
};

type EventSpeakersProps = EventSpeakersData & { updateFields: (fields: Partial<EventSpeakersData>) => void };

export function EventSpeakers({ speakers, updateFields }: EventSpeakersProps) {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState('');

  const handleSaveSpeaker = () => {
    const newSpeaker = {
      name,
      bio,
      photo: photo || 'default photo', // Set to 'default photo' if photo is empty
    };
    updateFields({ speakers: [...speakers, newSpeaker] });
    console.log('Speakers', { speakers });
    // Reset the input fields
    setName('');
    setBio('');
    setPhoto('');
  };

  return (
    <div className="mt-2 flex w-full flex-col">
      <h2 className="mb-2 text-center text-xl">Tell us about the speakers</h2>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" className="mx-auto mt-2 max-w-sm">
            Add a speaker
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Speaker Details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} className="col-span-3" />
            </div>
            {/* Add input fields for photo or any other details you need */}
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSaveSpeaker}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <EventSpeakersList speakers={speakers} />
    </div>
  );
}
