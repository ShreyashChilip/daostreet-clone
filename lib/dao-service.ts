import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Dao } from "@/lib/types"

export async function getDaos(query?: string): Promise<Dao[]> {
  const supabase = createServerComponentClient({ cookies })

  let queryBuilder = supabase.from("daos").select(`
      *,
      creator:creator_id(id, email, full_name, avatar_url),
      members:dao_members(count)
    `)

  if (query) {
    queryBuilder = queryBuilder.ilike("name", `%${query}%`)
  }

  const { data, error } = await queryBuilder.order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching DAOs:", error)
    return []
  }

  return data as unknown as Dao[]
}

export async function getDaoById(id: string): Promise<Dao | null> {
  const supabase = createServerComponentClient({ cookies })

  const { data, error } = await supabase
    .from("daos")
    .select(`
      *,
      creator:creator_id(id, email, full_name, avatar_url),
      members:dao_members(count)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching DAO:", error)
    return null
  }

  return data as unknown as Dao
}
