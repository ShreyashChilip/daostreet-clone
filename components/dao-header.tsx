import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Share2, Users } from "lucide-react"
import type { Dao } from "@/lib/types"

interface DaoHeaderProps {
  dao: Dao
}

export function DaoHeader({ dao }: DaoHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={dao.logo_url || ""} alt={dao.name} />
          <AvatarFallback>{dao.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{dao.name}</h1>
          <p className="text-sm text-muted-foreground">Created by {dao.creator.full_name || dao.creator.email}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
        <Button variant="outline" size="sm">
          <Users className="mr-2 h-4 w-4" />
          Join
        </Button>
      </div>
    </div>
  )
}
