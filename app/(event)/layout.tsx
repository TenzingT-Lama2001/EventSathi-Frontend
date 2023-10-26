'use client';
import Header from '@/components/Header';
import AuthGuard from '@/guards/AuthGuard';
import useAuth from '@/hooks/useAuth';
import { checkRoles } from '@/lib/checkRoles';
import { useRouter } from 'next/navigation';

interface EventLayoutProps {
  children?: React.ReactNode;
}

export default function EventLayout({ children }: EventLayoutProps) {
  const { user } = useAuth();

  const role = checkRoles(user?.user_roles);
  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col space-y-6">
        <Header />
        <>{role?.includes('ADMIN') || role?.includes('ORGANIZER') ? <>{children}</> : <div>Unauthorized</div>}</>
      </div>
    </AuthGuard>
  );
}
