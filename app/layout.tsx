import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Sidebar } from "@/components/sidebar"
import { CookieConsent } from "@/components/cookie-consent"
import { SupabaseProvider } from "@/lib/supabase-provider"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DAOStreet - Decentralized Autonomous Organizations",
  description: "Create and manage your DAOs with DAOStreet",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SupabaseProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                {children}
                <Footer />
                <CookieConsent />
                <Toaster />
              </div>
            </div>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
