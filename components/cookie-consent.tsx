"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("cookie-consent")
    if (!hasConsented) {
      setShowConsent(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true")
    setShowConsent(false)
  }

  if (!showConsent) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 z-50">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          We use cookies to offer a better browsing experience, analyze site traffic, personalize content. Please review
          our{" "}
          <Link href="/privacy" className="underline">
            privacy policy
          </Link>
          . By clicking accept, you consent to our privacy policy & use of cookies.
        </p>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowConsent(false)}>
            Cookie settings
          </Button>
          <Button onClick={acceptCookies}>Accept cookies</Button>
        </div>
      </div>
    </div>
  )
}
