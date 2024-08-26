import React from 'react'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import SecondProfile from './_components/SecondProfile'
import { auth } from '@/auth';
import { getUserById } from '@/db/users';
import { User } from '@prisma/client';

const ProfilePage = async () => {
  const session = await auth();
  const user = await getUserById(session?.user?.id || "");
  console.log("user", user);

  return (
    <ContentLayout title='Profile'>
      {/* <Profile /> */}
      <SecondProfile profile={user as User} />
    </ContentLayout>
  )
}

export default ProfilePage