import { isValidToken } from '@/lib/jwt'
import jwtDecode from 'jwt-decode'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

interface AuthLayoutProps {
  children: React.ReactNode
}
console.log('rendered auth layout')
export default function AuthLayout({ children }: AuthLayoutProps) {
  const cookieStore = cookies()
  const jwt = cookieStore.get('jwt');
  console.log("🚀 ~ file: layout.tsx:12 ~ AuthLayout ~ jwt2:", jwt)
  const isValid = isValidToken(jwt?.value)
  console.log("🚀 ~ file: layout.tsx:14 ~ AuthLayout ~ isValid2:", isValid)

  if (isValid) {
    redirect('/dashboard')
  }
  return (
      <div className="min-h-screen">
          {children}
      </div>
  )
}
