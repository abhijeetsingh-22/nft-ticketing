import React from 'react'
import Profile from './_components/Profile'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import SecondProfile from './_components/SecondProfile'

const ProfilePage = () => {
  return (
    <ContentLayout title='Profile'>
      {/* <Profile /> */}
      <SecondProfile />
    </ContentLayout>
  )
}

export default ProfilePage