import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CommunityPage() {
  return (
    <main className="flex-1 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Community</h1>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Join Our Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Connect with other DAO enthusiasts, share ideas, and get help from our community members.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild>
                  <Link href="https://discord.gg/daostreet">Discord</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="https://twitter.com/daostreet">Twitter</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="https://forum.daostreet.io">Forum</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">DAO Governance Workshop</h3>
                  <p className="text-sm text-muted-foreground">May 15, 2023 • 2:00 PM UTC</p>
                  <p className="mt-1">Learn best practices for DAO governance and decision making.</p>
                </div>
                <div>
                  <h3 className="font-semibold">Community Call</h3>
                  <p className="text-sm text-muted-foreground">May 22, 2023 • 3:00 PM UTC</p>
                  <p className="mt-1">Monthly community call to discuss updates and answer questions.</p>
                </div>
                <div>
                  <h3 className="font-semibold">DAO Treasury Management</h3>
                  <p className="text-sm text-muted-foreground">June 5, 2023 • 2:00 PM UTC</p>
                  <p className="mt-1">Strategies for effective DAO treasury management.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Link href="/resources/guides" className="text-primary hover:underline">
                    DAO Guides and Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="/resources/templates" className="text-primary hover:underline">
                    DAO Templates
                  </Link>
                </li>
                <li>
                  <Link href="/resources/case-studies" className="text-primary hover:underline">
                    Case Studies
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
