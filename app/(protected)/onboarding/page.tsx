import { ContentLayout } from '@/components/admin-panel/content-layout'
import { CardDemo } from '@/components/Card'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'

const Onboarding = () => {
  return (
    <ContentLayout title='Onboarding'>
      <MaxWidthWrapper className='mt-24 mb-8 text-center'>
        {/* <h1 className='font-bold text-3xl'>Onboarding</h1> */}
        <div className='flex justify-center items-center gap-4'>
          <CardDemo title='Create new event' description='Create a new event and make it public so that people can book it.' />
          <CardDemo title='Buy tickets' description='Buy tickets for an event.' />
        </div>
      </MaxWidthWrapper>
    </ContentLayout>
  )
}

export default Onboarding


