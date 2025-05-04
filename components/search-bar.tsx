"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") || "")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)

    if (query) {
      params.set("q", query)
    } else {
      params.delete("q")
    }

    router.push(`/daos?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="relative mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="search"
        placeholder="Search"
        className="pl-10"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  )
}
