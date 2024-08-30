import React from 'react'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import SecondProfile from './_components/SecondProfile'
import { auth } from '@/auth';
import { getUserById } from '@/db/users';
import { SocialLink, User } from '@prisma/client';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import Link from 'next/link';

const ProfilePage = async () => {
  const session = await auth();
  const user = await getUserById(session?.user?.id || "");

  return (
    <ContentLayout title='Profile'>
      <Breadcrumb className='mx-auto px-4 max-w-6xl'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Profile</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <SecondProfile profile={user as User & { socialLink: SocialLink }} />
    </ContentLayout>
  )
}

export default ProfilePage