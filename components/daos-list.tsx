import { getDaos } from "@/lib/dao-service"
import { DaoCard } from "@/components/dao-card"

export async function DaosList({ query }: { query?: string }) {
  const daos = await getDaos(query)

  if (daos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No DAOs found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {daos.map((dao) => (
        <DaoCard key={dao.id} dao={dao} />
      ))}
    </div>
  )
}
