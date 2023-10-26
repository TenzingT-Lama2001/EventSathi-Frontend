'use client';
import useAuth from '@/hooks/useAuth';
import { checkRoles } from '@/lib/checkRoles';
import OrganizerDashboard from '@/components/dashboard/OrganizerDashboard';
import UserDashboard from '@/components/dashboard/UserDashboard';

export default function DashboardPage() {
  const { user } = useAuth();
  const role = checkRoles(user?.user_roles);
  return (
    <>
      {role?.includes('ADMIN') ? (
        <div>Admin Dashboard</div>
      ) : role?.includes('ORGANIZER') ? (
        <OrganizerDashboard />
      ) : (
        <UserDashboard />
      )}
    </>
  );
}
