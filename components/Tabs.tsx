import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EventDetailsData, TabsDemoProps } from './event/EventDetails';
import { FormEvent, useState } from 'react';

export function TabsDemo({ updateFields, location, event_link, max_attendees }: TabsDemoProps) {
  const [selectedTab, setSelectedTab] = useState<'ONLINE' | 'IN-PERSON'>('IN-PERSON');

  const handleMaxAttendee = (e: FormEvent) => {
    const max_attendees = parseInt((e.target as HTMLInputElement).value);
    updateFields({ max_attendees });
  };

  const handleLocation = (e: FormEvent) => {
    const location = (e.target as HTMLInputElement).value;
    updateFields({ location });
  };

  const handleMeetLink = (e: FormEvent) => {
    const event_link = (e.target as HTMLInputElement).value;
    updateFields({ event_link });
  };

  return (
    <>
      <Tabs defaultValue="IN-PERSON" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="IN-PERSON"
            onClick={() => {
              setSelectedTab('IN-PERSON');
              updateFields({ event_location_type: 'IN_PERSON', event_link: '' });
            }}
          >
            In-Person
          </TabsTrigger>
          <TabsTrigger
            value="ONLINE"
            onClick={() => {
              setSelectedTab('ONLINE');
              updateFields({ event_location_type: 'ONLINE', location: '' });
            }}
          >
            Online
          </TabsTrigger>
        </TabsList>
        <TabsContent value={selectedTab}>
          {selectedTab === 'IN-PERSON' ? (
            <Card>
              <CardHeader>
                <CardTitle>In-Person</CardTitle>
                <CardDescription>Make changes to your in-person event here.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" value={location} onChange={(e) => handleLocation(e)} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="max_attendees">Maximum Attendees</Label>
                  <Input
                    id="max_attendees"
                    value={max_attendees}
                    type="number"
                    onChange={(e) => handleMaxAttendee(e)}
                  />
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Online</CardTitle>
                <CardDescription>Change your online event details here.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Meet Link</Label>
                  <Input id="current" type="online" value={event_link} onChange={(e) => handleMeetLink(e)} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="max_attendees">Maximum Attendees</Label>
                  <Input
                    id="max_attendees"
                    value={max_attendees}
                    type="number"
                    onChange={(e) => handleMaxAttendee(e)}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}
