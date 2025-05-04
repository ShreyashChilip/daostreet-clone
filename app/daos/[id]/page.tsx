import { notFound } from "next/navigation"
import { getDaoById } from "@/lib/dao-service"
import { DaoHeader } from "@/components/dao-header"
import { DaoMembers } from "@/components/dao-members"

export default async function DaoPage({ params }: { params: { id: string } }) {
  const dao = await getDaoById(params.id)

  if (!dao) {
    notFound()
  }

  return (
    <main className="flex-1 p-6">
      <DaoHeader dao={dao} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">About</h2>
          <p className="text-muted-foreground">{dao.description || "No description provided."}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Members</h2>
          <DaoMembers daoId={dao.id} />
        </div>
      </div>
    </main>
  )
}
