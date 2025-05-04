"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSupabase } from "@/lib/supabase-provider"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export function CreateDaoButton() {
  const { supabase, session } = useSupabase()
  const { toast } = useToast()
  const router = useRouter()

  const handleClick = async () => {
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create a DAO",
        variant: "destructive",
      })
      router.push("/sign-in")
      return
    }
  }

  return (
    <Button asChild onClick={handleClick} className="bg-teal-500 hover:bg-teal-600">
      <Link href="/create-dao">Create DAO</Link>
    </Button>
  )
}
