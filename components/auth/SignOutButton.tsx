'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'

const SignOutButton = () => {
  return (
    <Button variant="outline" onClick={async () => await signOut()}>Sign Out</Button>
  )
}

export default SignOutButton