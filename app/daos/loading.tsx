import { LoadingSpinner } from "@/components/loading-spinner"

export default function Loading() {
  return (
    <main className="flex-1 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">DAOs</h1>
      </div>
      <div className="h-10 mb-6 bg-muted animate-pulse rounded-md"></div>
      <LoadingSpinner />
    </main>
  )
}
