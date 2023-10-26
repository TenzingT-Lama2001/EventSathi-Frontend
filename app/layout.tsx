import './globals.css';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/provider/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { fontMono } from '@/lib/fonts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TanstackProvider from '@/components/provider/TanstackProvider';
import { cookies, headers } from 'next/headers';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={cn('min-h-screen bg-background font-sans antialiased', fontMono.variable)}>
          <TanstackProvider>
            <AuthProvider>
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <div className="relative flex min-h-screen flex-col">
                  <div className="flex-1">{children}</div>
                </div>
                <Toaster />
                <TailwindIndicator />
              </ThemeProvider>
            </AuthProvider>
          </TanstackProvider>
        </body>
      </html>
    </>
  );
}
