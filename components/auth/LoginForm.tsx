'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { authenticate } from '@/app/(public)/(auth)/login/actions'
import { Label } from '../ui/label'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Routes } from '@/routes'

const loginSchema = z.object({
  email: z.string().email('Invalid email address').min(5, 'Email must be at least 5 characters long').max(255, 'Email must be at most 255 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long')
})

type loginInput = z.infer<typeof loginSchema>

export default function LoginForm() {
  const router = useRouter()

  const form = useForm<loginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmit = async (values: loginInput) => {
    toast.promise(
      authenticate(values.email, values.password).then((data) => {
        console.log("data in login form", data);
        router.push(Routes.ONBOARDING)
      }),
      {
        loading: 'Logging in...',
        success: 'Logged in successfully',
        error: 'Failed to log in',
      }
    )
    form.reset()
  }

  return (
    <form className="border-gray-200 bg-white/75 shadow-lg backdrop-blur-lg mx-auto p-10 border-b rounded-3xl w-full max-w-lg" onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="max-w-lg">
        <h1 className='font-bold text-lg'>Log In</h1>
        <span className='mt-2'>Please log in to continue</span>
        <div className='space-y-8 mt-8'>
          <div className="gap-8 sm:gap-4 grid grid-cols-1">
            <div>
              <Label>Email</Label>
              <Input {...form.register('email')} type="email" />
              {form.formState.errors.email && (
                <p className="text-red-500/70 text-xs">{form.formState.errors.email.message}</p>
              )}
            </div>
            <div>
              <Label>Password</Label>
              <Input {...form.register('password')} type="password" />
              {form.formState.errors.password && (
                <p className="text-red-500/70 text-xs">{form.formState.errors.password.message}</p>
              )}
            </div>
          </div>
        </div>

      </div>
      <Button className="mt-8 w-full" type="submit">
        Log in
      </Button>
      <Link className={cn("mt-4 w-full", buttonVariants())} href="/signup">
        No account yet? Sign up
      </Link>
    </form>
  )
}
