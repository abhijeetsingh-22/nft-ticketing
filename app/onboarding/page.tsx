import React from 'react'
import Onboarding from './_components/Onboarding'
import { auth } from '@/auth'
import { getUserById } from '@/db/users'
import { redirect } from 'next/navigation'
import { Routes } from '@/routes'

const OnboardingPage = async () => {
  const session = await auth()

  if (!session) {
    return redirect(Routes.LOGIN)
  }

  const loggedInUser = await getUserById(session?.user?.id as string)

  if (loggedInUser?.isOnboarded) {
    return redirect(Routes.DASHBOARD)
  }

  return (
    <Onboarding />
  )
}

export default OnboardingPage


