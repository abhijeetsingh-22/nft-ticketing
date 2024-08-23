'use client'

import { useFormState, useFormStatus } from 'react-dom'
import Link from 'next/link'
import { useEffect } from 'react'
import { IconSpinner } from '@/components/ui/icons'
import { useRouter } from 'next/navigation'
import { signup } from '@/app/(auth)/signup/actions'

export default function SignupForm() {
  const router = useRouter()
  // const [result, dispatch] = useFormState(signup, undefined)

  // useEffect(() => {
  //   if (result) {
  //     console.log('result', result)
  //     if (result) {
  //       router.push('/')
  //     }

  //   }
  // }, [result, router])

  return (
    <form
      // action={dispatch}
      className="flex flex-col items-center gap-4 space-y-3 mt-4"
    >
      <div className="flex-1 bg-white dark:bg-zinc-950 shadow-md px-6 pt-8 pb-4 border rounded-lg w-full md:w-96">
        <h1 className="mb-3 font-bold text-2xl">Sign up for an account</h1>
        <div className="w-full">
          <div>
            <label
              className="block mt-5 mb-3 font-medium text-xs text-zinc-400"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="block dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-2 py-[9px] border rounded-md w-full text-sm placeholder:text-zinc-500 outline-none peer"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="block mt-5 mb-3 font-medium text-xs text-zinc-400"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="block dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-2 py-[9px] border rounded-md w-full text-sm placeholder:text-zinc-500 outline-none peer"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
            </div>
          </div>
        </div>
        <LoginButton />
      </div>

      <Link href="/login" className="flex flex-row gap-1 text-sm text-zinc-400">
        Already have an account?
        <div className="font-semibold underline">Log in</div>
      </Link>
    </form>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <button
      className="flex flex-row justify-center items-center bg-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 dark:bg-zinc-100 my-4 p-2 rounded-md w-full h-10 font-semibold text-sm text-zinc-100 dark:text-zinc-900"
      aria-disabled={pending}
    >
      {pending ? <IconSpinner /> : 'Create account'}
    </button>
  )
}
