import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If we have a session, ensure the user exists in the users table
  if (session?.user) {
    const { data: existingUser } = await supabase.from("users").select("id").eq("id", session.user.id).single()

    // If user doesn't exist in our users table, create them
    if (!existingUser) {
      await supabase.from("users").insert({
        id: session.user.id,
        email: session.user.email,
        full_name: session.user.user_metadata?.full_name || session.user.user_metadata?.name,
        avatar_url: session.user.user_metadata?.avatar_url,
      })
    }
  }

  return res
}
