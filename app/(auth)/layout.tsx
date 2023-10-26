'use client';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getAccessTokenFromCookie, isValidToken } from '@/lib/jwt';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}
console.log('CLIENT: rendered auth layout');
export default function AuthLayout({ children }: AuthLayoutProps) {
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const accessToken = getAccessTokenFromCookie();

    if (accessToken) {
      router.push('/dashboard');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}
