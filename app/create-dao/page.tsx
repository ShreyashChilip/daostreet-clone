import { CreateDaoForm } from "@/components/create-dao-form"

export default function CreateDaoPage() {
  return (
    <main className="flex-1 p-6">
      <h1 className="text-2xl font-bold mb-6">Create a New DAO</h1>
      <CreateDaoForm />
    </main>
  )
}
