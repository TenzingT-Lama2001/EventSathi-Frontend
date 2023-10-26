'use client';
import { MainNav } from '@/components/main-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import { UserAccountNav } from '@/components/dashboard/UserAccountNav';
import React, { Suspense, useEffect } from 'react';
import AuthGuard from '@/guards/AuthGuard';
import { getAccessTokenFromCookie, setSession } from '@/lib/jwt';
import { useToast, toast } from '@/components/ui/use-toast';
import useAuth from '@/hooks/useAuth';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { toast } = useToast();
  const { user } = useAuth();

  React.useEffect(() => {
    // Check if the authentication was successful using the query parameter
    const queryParams = new URLSearchParams(window.location.search);
    const authSuccess = queryParams.get('authSuccess');
    const accessToken = getAccessTokenFromCookie() as string;
    let timeout: NodeJS.Timeout;
    if (authSuccess === 'true') {
      timeout = setTimeout(() => {
        setSession(accessToken);
        toast({
          title: 'Login successful',
          description: 'You are now logged in.',
        });
      }, 0);
    } else if (authSuccess === 'false') {
    }
    return () => clearTimeout(timeout);
  }, [toast]);

  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col space-y-6">
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
        {children}
      </div>
    </AuthGuard>
  );
}
