import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const OrganizerPage = async () => {
  const session = await auth()
  const organiserId = session?.user?.id

  redirect(`/organizer/${organiserId}/events`)

}

export default OrganizerPage