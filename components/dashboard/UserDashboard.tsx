'use client';
import { Calendar } from '@/components/ui/calendar';
import useAuth from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}
const times = [1, 2, 3, 4, 5, 6];
export default function UserDashboard({ children }: DashboardLayoutProps) {
  const { user } = useAuth();
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
