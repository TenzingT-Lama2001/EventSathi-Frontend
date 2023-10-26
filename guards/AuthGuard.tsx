'use client';
import { getCurrentUser } from '@/api/auth';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getAccessTokenFromCookie, isValidToken } from '@/lib/jwt';
import { useQuery } from '@tanstack/react-query';
import { useRouter, usePathname } from 'next/navigation';
import React, { Suspense } from 'react';

interface AuthGuardProps {
  children?: React.ReactNode;
}
console.log('CLIENT: rendered auth GUARD');
export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const accessToken = getAccessTokenFromCookie();
  // console.log('🚀 ~ file: AuthGuard.tsx:14 ~ AuthGuard ~ accessToken:', accessToken);

  const isAccessTokenValid = accessToken && isValidToken(accessToken);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['getCurrentUser'],
    queryFn: async () => {
      const result = await getCurrentUser();
      return result;
    },
    enabled: !!isAccessTokenValid,
    refetchOnWindowFocus: false,
  });

  React.useEffect(() => {
    if (!isAccessTokenValid) {
      router.push('/login');
    }
  }, [isAccessTokenValid, router]);

  // Redirect to login immediately if there's an error while fetching user data
  if (isError) {
    router.push('/login');
    return null; // You can return null or some loading component here
  }

  // Only render children if access token is valid and data is available
  if (isAccessTokenValid && !isLoading && !isFetching && data) {
    return <div>{children}</div>;
  }

  // If access token is invalid or data is still loading, you can return a loading component or redirect to login
  if (!isAccessTokenValid || isLoading || isFetching) {
    return <LoadingSpinner />; // Create a loading component or a loading spinner
  }

  // If there's no data, you can also redirect to the login page
  router.push('/login');
  return null; // You can return null or some loading component here
}
