import { auth } from '@/auth'
import LoginForm from '@/components/auth/LoginForm'


import { redirect } from 'next/navigation'

export default async function LoginPage() {

  return (
    <main className="flex flex-col p-4">
      <LoginForm />
    </main>
  )
}
