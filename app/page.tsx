import { redirect } from "next/navigation"

export default function Home() {
  // Redirect to the DAOs page
  redirect("/daos")
}
