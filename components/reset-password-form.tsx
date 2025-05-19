"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useSupabase } from "@/lib/supabase-provider"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { AlertCircle, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function ResetPasswordForm() {
  const router = useRouter()
  const { supabase } = useSupabase()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isValidLink, setIsValidLink] = useState(true)

  useEffect(() => {
    // Check if the user has a valid recovery token
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error || !data.session) {
        setIsValidLink(false)
      }
    }

    checkSession()
  }, [supabase.auth])

  const validatePassword = (password: string): boolean => {
    // Password must be at least 8 characters
    return password.length >= 8
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Validate passwords
    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long")
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) throw error

      toast({
        title: "Password updated",
        description: "Your password has been successfully updated",
      })

      // Redirect to sign in page after successful password reset
      router.push("/sign-in")
    } catch (error: any) {
      setError(error.message || "Failed to update password. Please try again.")
      toast({
        title: "Error",
        description: error.message || "Failed to update password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!isValidLink) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold">Invalid or Expired Link</h2>
            <p className="text-muted-foreground">
              This password reset link is invalid or has expired. Please request a new password reset link.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-4">
          <Button asChild>
            <Link href="/forgot-password">Request New Link</Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center mb-4">
            <p className="text-muted-foreground">Create a new password for your account.</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={8}
            />
            <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Updating..." : "Reset Password"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t p-4">
        <Button variant="link" asChild>
          <Link href="/sign-in">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to sign in
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
