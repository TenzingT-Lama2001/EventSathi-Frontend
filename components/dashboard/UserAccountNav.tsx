'use client';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserAvatar } from '@/components/UserAvatar';
import { clearCookies } from '@/lib/jwt';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';
import useAuth from '@/hooks/useAuth';
import { AuthUser } from '@/context/AuthContext';
import { logout } from '@/api/auth';

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: AuthUser;
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  const { toast } = useToast();
  const router = useRouter();
  const handleSignOut = async () => {
    await logout();
    router.push('/login');
    toast({
      title: 'Logout successful',
      description: 'You are now logout .',
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={{ avatar: user?.avatar }} className="h-8 w-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user?.first_name && <p className="font-medium">{user?.first_name}</p>}
            {user?.email && <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/billing">Billing</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event: any) => {
            event.preventDefault();
            handleSignOut();
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
