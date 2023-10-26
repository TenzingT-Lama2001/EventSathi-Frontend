'use client';
import { Calendar } from '@/components/ui/calendar';
import useAuth from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
interface DashboardLayoutProps {
  children?: React.ReactNode;
}
const times = [1, 2, 3, 4, 5, 6];
export default function OrganizerDashboard({ children }: DashboardLayoutProps) {
  const { isAuthenticated, isInitialized, user } = useAuth();
  const router = useRouter();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <div className="container grid flex-1 gap-12 lg:grid-cols-[280px_1fr]">
      <aside className="hidden w-[300px] flex-col items-center lg:flex">
        <h2 className="my-6 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Welcome, {user?.first_name}
        </h2>
        <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
      </aside>
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        <main className="flex flex-col gap-3 lg:mt-6">
          <div className="mb-3 flex justify-end">
            <Button onClick={() => router.push('/event')}>Create Event</Button>
            {/* <Link href="/event">Create Event</Link> */}
          </div>
          {times.map((t, index) => {
            return (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
              </Card>
            );
          })}
        </main>
      </main>
    </div>
  );
}
