'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createUser, signup } from '@/app/(auth)/signup/actions'
import { ResultCode, getMessageFromCode } from '@/lib/utils'
import { Label } from '../ui/label'

export const signUpSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z
      .string()
      .email('Invalid email address')
      .min(5, 'Email must be at least 5 characters long')
      .max(255, 'Email must be at most 255 characters long'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    repeatPassword: z.string().min(8, 'Password must be at least 8 characters long'),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ['repeatPassword'], // path of error
  })

type signUpInput = z.infer<typeof signUpSchema>

export default function SignupForm2() {
  const router = useRouter()

  const form = useForm<signUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
  })


  const handleSubmit = async (values: signUpInput) => {
    const name = `${values.firstName} ${values.lastName}`
    const signupData = { email: values.email, password: values.password, name }
    toast.promise(
      signup(signupData).then(() => {
        router.push(`/login`)
      }),
      {
        loading: 'Creating account...',
        success: 'Account created successfully',
        error: 'Failed to create account',
      }
    )
  }

  return (
    <form className="shadow-lg border-gray-200 bg-white/75 backdrop-blur-lg border-b  mx-auto p-10  rounded-3xl max-w-xl" onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="">
        <h1 className='text-lg font-bold'>Sign up</h1>
        <span className='mt-2'>Create an account to get started</span>
        <div className="space-y-8 mt-8">
          <div className="gap-8 sm:gap-4 grid grid-cols-1 sm:grid-cols-2">
            <div>
              <Label>First name</Label>
              <Input {...form.register('firstName')} />
              {form.formState.errors.firstName && (
                <p className="text-red-500/70 text-xs">{form.formState.errors.firstName.message}</p>
              )}
            </div>
            <div>
              <Label>Last name</Label>
              <Input {...form.register('lastName')} />
              {form.formState.errors.lastName && (
                <p className="text-red-500/70 text-xs">{form.formState.errors.lastName.message}</p>
              )}
            </div>
          </div>
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
          <div>
            <Label>Confirm Password</Label>
            <Input {...form.register('repeatPassword')} type="password" />
            {form.formState.errors.repeatPassword && (
              <p className="text-red-500/70 text-xs">{form.formState.errors.repeatPassword.message}</p>
            )}
          </div>
        </div>
      </div >
      <Button className="mt-8 w-full" type="submit">
        Create account
      </Button>
      <Button className="mt-4 w-full" onClick={() => router.push('/login')}>
        Have an account? Login
      </Button>
    </form >
  )
}