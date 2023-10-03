import { getCurrentUser } from "@/api/auth"
import { getAccessTokenFromCookie } from "@/lib/jwt"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import React from "react"

interface AuthGuardProps { 
    children?: React.ReactNode
}
export default function AuthGuard({
    children
}: AuthGuardProps) {
    const router = useRouter(); 
    const accessToken = getAccessTokenFromCookie()

    React.useEffect(() => { 
        if (!accessToken) {
            router.push('/login')
        }
    },[])
 

  const { data, isLoading, isError } = useQuery({
    queryKey: ['getCurrentUser'],
    queryFn: async () => {
      const result = await getCurrentUser()
      console.log("🚀 ~ file: layout.tsx:84 ~ queryFn: ~ result:", result)
      return result
      },
        enabled: !!accessToken
  })
  if (isLoading) {
    // Render a loading indicator or placeholder
    return <div>Loading...</div>;
  }

  if (isError || !data?.user) {
    // If there's an error or the user is not authenticated, redirect to the login page
    router.push('/login');
    return null; // Return null to prevent rendering the children
  }

    return (

        <div>
            {children}
        </div>
    )
}
