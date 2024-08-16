import { auth } from '@/auth'
import SignupForm from '@/components/auth/SignupForm'
import { Session } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function SignupPage() {
  const session: Session | null = await auth()
  console.log("session in signup", session);


  if (session) {
    redirect('/')
  }

  return (
    <main className="flex flex-col p-4">
      <SignupForm />
    </main>
  )
}
