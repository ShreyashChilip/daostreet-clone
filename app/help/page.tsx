import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HelpPage() {
  return (
    <main className="flex-1 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Help Center</h1>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Link href="/help/create-dao" className="text-primary hover:underline">
                    How to create a DAO
                  </Link>
                </li>
                <li>
                  <Link href="/help/join-dao" className="text-primary hover:underline">
                    How to join an existing DAO
                  </Link>
                </li>
                <li>
                  <Link href="/help/account" className="text-primary hover:underline">
                    Managing your account
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>DAO Management</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Link href="/help/members" className="text-primary hover:underline">
                    Managing DAO members
                  </Link>
                </li>
                <li>
                  <Link href="/help/governance" className="text-primary hover:underline">
                    Governance and voting
                  </Link>
                </li>
                <li>
                  <Link href="/help/treasury" className="text-primary hover:underline">
                    Treasury management
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Link href="/help/faq" className="text-primary hover:underline">
                    General FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/help/security" className="text-primary hover:underline">
                    Security and privacy
                  </Link>
                </li>
                <li>
                  <Link href="/help/troubleshooting" className="text-primary hover:underline">
                    Troubleshooting common issues
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Can't find what you're looking for? Contact our support team at{" "}
            <a href="mailto:support@daostreet.io" className="text-primary hover:underline">
              support@daostreet.io
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
