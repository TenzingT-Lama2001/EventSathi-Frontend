"use client"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserAccountNav } from "@/components/dashboard/UserAccountNav"
import { Calendar } from "@/components/ui/calendar"
import React from "react"
import AuthGuard from "@/guards/AuthGuard"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

const user: User = {
    name: "Tenzing",
    // image: "" ,
    email: "tenz@gmail.com"
}

export interface User  {
    name?: string | null
    email?: string | null
    image?: string | null
}
export default function DashboardLayout({ children }: DashboardLayoutProps) {

const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
  <AuthGuard>
    <div className="flex flex-col min-h-screen space-y-6"> 
    <header className="bg-background sticky top-0 z-40 border-b">
      <div className="container flex h-16 items-center justify-between py-4">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            <UserAccountNav
                    user={{
                        name: user.name || null,
                        image: user.image  || null,
                        email: user.email  || null,
                    }}
            />  
          </nav>
        </div>
      </div>
            </header>
            <div className="container grid flex-1 gap-12 lg:grid-cols-[280px_1fr]">
                <aside className="hidden w-[300px] flex-col lg:flex items-center">
                        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 my-6">
                            Welcome, {user.name}
                        </h2>
                        <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border"
                            /> 
                </aside>
                <main className="flex w-full flex-1 flex-col overflow-hidden">
                    {children}
                </main>
            </div>
      </div>
    </AuthGuard>
  )
}
