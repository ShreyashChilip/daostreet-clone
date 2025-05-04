import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import type { Dao } from "@/lib/types"

interface DaoCardProps {
  dao: Dao
}

export function DaoCard({ dao }: DaoCardProps) {
  return (
    <Link href={`/daos/${dao.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={dao.logo_url || ""} alt={dao.name} />
            <AvatarFallback>{dao.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{dao.name}</h3>
            <p className="text-sm text-muted-foreground">
              Created {formatDistanceToNow(new Date(dao.created_at), { addSuffix: true })}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm line-clamp-3">{dao.description || "No description provided."}</p>
        </CardContent>
        <CardFooter>
          <Badge variant="outline">DAO</Badge>
        </CardFooter>
      </Card>
    </Link>
  )
}
