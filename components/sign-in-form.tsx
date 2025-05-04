"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useSupabase } from "@/lib/supabase-provider"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Lock } from "lucide-react"

export function SignInForm() {
  const router = useRouter()
  const { supabase } = useSupabase()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [magicLinkEmail, setMagicLinkEmail] = useState("")
  const [magicLinkSent, setMagicLinkSent] = useState(false)

  // Email/Password sign in
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      router.push("/daos")
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error signing in",
        description: error.message || "Please check your credentials and try again",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  // Magic link sign in
  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: magicLinkEmail,
        options: {
          emailRedirectTo: `${window.location.origin}`,
        },
      })

      if (error) throw error

      setMagicLinkSent(true)
      toast({
        title: "Magic link sent",
        description: "Please check your email for the login link",
      })
    } catch (error: any) {
      toast({
        title: "Error sending magic link",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  // Google sign in
  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}`,
        },
      })

      if (error) throw error
    } catch (error: any) {
      toast({
        title: "Error signing in with Google",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="email-password" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="email-password">Email</TabsTrigger>
            <TabsTrigger value="magic-link">Magic Link</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
          </TabsList>

          <TabsContent value="email-password">
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </div>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    <span>Password</span>
                  </div>
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <div className="text-right">
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Signing in..." : "Sign In with Email"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="magic-link">
            {!magicLinkSent ? (
              <form onSubmit={handleMagicLink} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="magic-link-email">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>Email</span>
                    </div>
                  </Label>
                  <Input
                    id="magic-link-email"
                    type="email"
                    value={magicLinkEmail}
                    onChange={(e) => setMagicLinkEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Sending..." : "Send Magic Link"}
                </Button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="text-2xl">✉️</div>
                <h3 className="font-medium text-lg">Check your email</h3>
                <p className="text-muted-foreground">
                  We've sent a magic link to <strong>{magicLinkEmail}</strong>
                </p>
                <Button variant="outline" className="mt-4" onClick={() => setMagicLinkSent(false)}>
                  Use a different email
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="social">
            <div className="space-y-4">
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center gap-2"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="h-5 w-5">
                  <path
                    fill="#EA4335"
                    d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                  />
                  <path
                    fill="#34A853"
                    d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                  />
                  <path
                    fill="#4A90E2"
                    d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                  />
                </svg>
                Sign in with Google
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center border-t p-4">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
