import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { DaoMember } from "@/lib/types"

interface DaoMembersProps {
  daoId: string
}

async function getMembers(daoId: string): Promise<DaoMember[]> {
  const supabase = createServerComponentClient({ cookies })

  const { data, error } = await supabase
    .from("dao_members")
    .select(`
      *,
      user:user_id(id, email, full_name, avatar_url)
    `)
    .eq("dao_id", daoId)
    .order("joined_at", { ascending: false })

  if (error) {
    console.error("Error fetching DAO members:", error)
    return []
  }

  return data as unknown as DaoMember[]
}

export async function DaoMembers({ daoId }: DaoMembersProps) {
  const members = await getMembers(daoId)

  return (
    <div className="space-y-4">
      {members.length === 0 ? (
        <p className="text-muted-foreground">No members found</p>
      ) : (
        <ul className="space-y-3">
          {members.map((member) => (
            <li key={member.id} className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={member.user.avatar_url || ""} alt={member.user.full_name || ""} />
                <AvatarFallback>
                  {(member.user.full_name || member.user.email).substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{member.user.full_name || member.user.email}</p>
              </div>
              {member.role === "admin" && <Badge variant="outline">Admin</Badge>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
