'use client';
import { MainNav } from '@/components/main-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import { UserAccountNav } from '@/components/dashboard/UserAccountNav';
import React, { Suspense, useEffect } from 'react';
import useAuth from '@/hooks/useAuth';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            <UserAccountNav
              user={{
                first_name: user?.first_name || null,
                avatar: user?.avatar || null,
                email: user?.email || null,
              }}
            />
          </nav>
        </div>
      </div>
    </header>
  );
}
