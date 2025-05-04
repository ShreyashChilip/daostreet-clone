"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { SupabaseClient, Session } from "@supabase/supabase-js"
import { useToast } from "@/components/ui/use-toast"

type SupabaseContext = {
  supabase: SupabaseClient
  session: Session | null
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createClientComponentClient())
  const [session, setSession] = useState<Session | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)

      if (event === "SIGNED_IN") {
        toast({
          title: "Signed in successfully",
          description: "Welcome back!",
        })
      }

      if (event === "SIGNED_OUT") {
        toast({
          title: "Signed out",
          description: "You have been signed out",
        })
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, toast])

  return <Context.Provider value={{ supabase, session }}>{children}</Context.Provider>
}

export function useSupabase() {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider")
  }
  return context
}
