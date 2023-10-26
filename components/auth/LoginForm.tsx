'use client';

import * as React from 'react';
import { redirect, useSearchParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { loginSchema } from '@/lib/validations/auth';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast, useToast } from '@/components/ui/use-toast';
import { Icons } from '@/components/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { cn } from '@/lib/utils';
import { getAccessTokenFromCookie, setSession } from '@/lib/jwt';
import axiosInstance from '@/lib/axios';
import useAuth from '@/hooks/useAuth';

type LoginFormProps = React.HTMLAttributes<HTMLDivElement>;

export type LoginDto = z.infer<typeof loginSchema>;

export function LoginForm({ className, ...props }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
  });
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const router = useRouter();
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);
  const accessToken = getAccessTokenFromCookie() as string;
  const { login } = useAuth();
  // const {
  //   mutate: loginMutation,
  //   isLoading,
  //   data: loginData,
  // } = useMutation({
  //   mutationFn: (data: LoginDto) => login(data),
  //   onSuccess: (data) => {
  //     // console.log('🚀 ~ file: LoginForm.tsx:41 ~ LoginForm ~ data:', data);
  //     const accessToken = getAccessTokenFromCookie() as string;
  //     // console.log('🚀 ~ file: LoginForm.tsx:42 ~ LoginForm ~ accessToken:', accessToken);
  //     setSession(accessToken);

  //     toast({
  //       title: 'Login successful',
  //       description: 'You are now logged in.',
  //     });
  //     router.push('/dashboard');
  //   },
  //   onError: (error) => {
  //     toast({
  //       title: 'Something went wrong.',
  //       description: 'Your sign in request failed. Please try again.',
  //       variant: 'destructive',
  //     });
  //   },
  // });

  const {
    mutate: loginMutation,
    isLoading,
    data: loginData,
  } = useMutation({
    mutationFn: (data: LoginDto) => login(data),
    onSuccess: (data) => {
      toast({
        title: 'Login successful',
        description: 'You are now logged in.',
      });
      router.push('/dashboard');
    },
    onError: (error) => {
      toast({
        title: 'Something went wrong.',
        description: 'Your sign in request failed. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const googleLogin = async () => {
    window.location.href = 'http://localhost:4200/api/auth/google/login';
  };

  async function onSubmit(data: LoginDto) {
    loginMutation(data);
    // reset()
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGoogleLoading}
              {...register('email')}
            />
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="*******"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading || isGoogleLoading}
              {...register('password')}
            />
            {errors?.email && <p className="px-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: 'outline' }))}
        onClick={() => {
          setIsGoogleLoading(true);
          googleLogin();
        }}
        disabled={isLoading || isGoogleLoading}
      >
        {isGoogleLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{' '}
        Google
      </button>
    </div>
  );
}
