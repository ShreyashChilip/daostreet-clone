"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, HelpCircle, Users, Info, BookOpen, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      name: "DAOs",
      href: "/daos",
      icon: Home,
    },
    {
      name: "Help",
      href: "/help",
      icon: HelpCircle,
    },
    {
      name: "Community",
      href: "/community",
      icon: Users,
    },
    {
      name: "About Us",
      href: "/about",
      icon: Info,
    },
    {
      name: "Street Diary",
      href: "/diary",
      icon: BookOpen,
    },
  ]

  return (
    <aside className="w-[200px] border-r bg-background flex flex-col h-screen sticky top-0">
      <div className="p-4 border-b">
        <Link href="/">
          <div className="flex items-center">
            <div className="w-8 h-8 relative">
              <Image src="/placeholder.svg?height=32&width=32" alt="DAOStreet Logo" width={32} height={32} />
            </div>
            <span className="ml-2 font-semibold text-lg">DAOStreet</span>
          </div>
        </Link>
      </div>
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {routes.map((route) => (
            <li key={route.href}>
              <Link href={route.href}>
                <Button
                  variant="ghost"
                  className={cn("w-full justify-start", pathname === route.href && "bg-secondary")}
                >
                  <route.icon className="mr-2 h-4 w-4" />
                  {route.name}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <Link href="/sign-in">
          <Button variant="ghost" className="w-full justify-start">
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </Button>
        </Link>
      </div>
    </aside>
  )
}
