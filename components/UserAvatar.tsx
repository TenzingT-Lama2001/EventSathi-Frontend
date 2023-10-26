import { AvatarProps } from '@radix-ui/react-avatar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icons } from '@/components/icons';
import { AuthUser } from '@/context/AuthContext';

interface UserAvatarProps extends AvatarProps {
  user: AuthUser;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user?.avatar ? (
        <AvatarImage alt="Picture" src={user.avatar} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.first_name}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
