import React from 'react'
import Onboarding from './_components/Onboarding'
import { auth } from '@/auth'
import { getUserById } from '@/db/users'
import { redirect } from 'next/navigation'
import { Routes } from '@/routes'
import { User } from '@prisma/client'

const OnboardingPage = async () => {
  const session = await auth()

  if (!session) {
    redirect(Routes.LOGIN)
  }

  const loggedInUser = await getUserById(session?.user?.id as string)

  if (loggedInUser?.isOnboarded) {
    redirect(Routes.DASHBOARD)
  }

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Onboarding user={loggedInUser as User} />
    </React.Suspense>
  )
}

export default OnboardingPage


