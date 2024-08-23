import React from 'react'
import EventsForm from '../../_components/EventsForm'

const NewEventPage = ({ params }: { params: { organiserId: string } }) => {
  return (
    <div>
      <EventsForm organiserId={params.organiserId} />
    </div>
  )
}

export default NewEventPage