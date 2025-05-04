import { Suspense } from "react"
import { DaosList } from "@/components/daos-list"
import { SearchBar } from "@/components/search-bar"
import { CreateDaoButton } from "@/components/create-dao-button"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function DaosPage() {
  return (
    <main className="flex-1 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">DAOs</h1>
        <CreateDaoButton />
      </div>
      <SearchBar />
      <Suspense fallback={<LoadingSpinner />}>
        <DaosList />
      </Suspense>
    </main>
  )
}
