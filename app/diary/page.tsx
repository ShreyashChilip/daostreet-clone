import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"

export default function DiaryPage() {
  // Mock data for diary entries
  const entries = [
    {
      id: 1,
      title: "Introducing DAOStreet",
      content:
        "Today we're excited to announce the launch of DAOStreet, a platform designed to make DAO creation and management accessible to everyone.",
      author: {
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SC",
      },
      date: new Date(2023, 4, 1),
    },
    {
      id: 2,
      title: "The Future of DAOs",
      content:
        "Decentralized Autonomous Organizations are changing the way we think about collaboration and governance. In this post, we explore the potential future of DAOs.",
      author: {
        name: "Michael Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MJ",
      },
      date: new Date(2023, 4, 15),
    },
    {
      id: 3,
      title: "Community Governance Best Practices",
      content:
        "Effective governance is key to a successful DAO. Here are some best practices we've learned from working with various communities.",
      author: {
        name: "Alex Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AR",
      },
      date: new Date(2023, 5, 1),
    },
  ]

  return (
    <main className="flex-1 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Street Diary</h1>

        <div className="grid gap-6">
          {entries.map((entry) => (
            <Card key={entry.id}>
              <CardHeader>
                <CardTitle>{entry.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{entry.content}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={entry.author.avatar || "/placeholder.svg"} alt={entry.author.name} />
                    <AvatarFallback>{entry.author.initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{entry.author.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatDistanceToNow(entry.date, { addSuffix: true })}
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
