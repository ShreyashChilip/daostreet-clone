"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/lib/supabase-provider"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export function CreateDaoForm() {
  const router = useRouter()
  const { supabase, session } = useSupabase()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo_url: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create a DAO",
        variant: "destructive",
      })
      router.push("/sign-in")
      return
    }

    if (!formData.name.trim()) {
      toast({
        title: "Validation error",
        description: "DAO name is required",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const { data, error } = await supabase
        .from("daos")
        .insert({
          name: formData.name.trim(),
          description: formData.description.trim(),
          logo_url: formData.logo_url.trim() || null,
          creator_id: session.user.id,
        })
        .select()
        .single()

      if (error) throw error

      // Also add the creator as a member with admin role
      await supabase.from("dao_members").insert({
        dao_id: data.id,
        user_id: session.user.id,
        role: "admin",
      })

      toast({
        title: "DAO created",
        description: `${formData.name} has been created successfully`,
      })

      router.push(`/daos/${data.id}`)
      router.refresh()
    } catch (error) {
      console.error("Error creating DAO:", error)
      toast({
        title: "Error",
        description: "Failed to create DAO. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">DAO Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter DAO name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your DAO"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo_url">Logo URL</Label>
            <Input
              id="logo_url"
              name="logo_url"
              value={formData.logo_url}
              onChange={handleChange}
              placeholder="https://example.com/logo.png"
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Creating..." : "Create DAO"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
