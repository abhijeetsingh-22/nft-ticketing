import React from 'react'
import EventsForm from '../../_components/EventsForm'
import { ContentLayout } from '@/components/admin-panel/content-layout'

const NewEventPage = ({ params }: { params: { organiserId: string } }) => {
  return (
    <ContentLayout title='Create New Event'>
      <EventsForm organiserId={params.organiserId} />
    </ContentLayout>
  )
}

export default NewEventPage