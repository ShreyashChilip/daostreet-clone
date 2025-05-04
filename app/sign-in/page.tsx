import { SignInForm } from "@/components/sign-in-form"

export default function SignInPage() {
  return (
    <main className="flex-1 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        <SignInForm />
      </div>
    </main>
  )
}
