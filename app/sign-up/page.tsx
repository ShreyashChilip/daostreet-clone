import { SignUpForm } from "@/components/sign-up-form"

export default function SignUpPage() {
  return (
    <main className="flex-1 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <SignUpForm />
      </div>
    </main>
  )
}
